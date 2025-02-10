// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';
import mime from 'mime-types';
import { NextResponse } from 'next/server';
import { existsSync, promises as fs, mkdir, mkdirSync } from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);
import { stat, unlink } from 'fs/promises';
import { cleanBatchname, cleanFilename, GetUniqueBatch, GenerateUniqueIdentifier } from "@/lib/fileLib"
import { auth } from '@/auth';
import { ConnectOrCreateCategoryTags } from '@/lib/articleLib';
import { db } from '@/lib/db';
import logger from 'logger.mjs';
import Ffmpeg, { FfmpegCommand, ffprobe } from 'fluent-ffmpeg';



const SETTINGS = {
    defaultFolder: "_default",
    videoFolder: "_video",
    audioFolder: "_audio"
}


async function GetFilePath (fileId) {

    let filePath
    let fileName

    filePath = path.posix.join(process.cwd(),`files`, fileId);
    fileName = fileId

    return { filePath, fileName}
}

async function GetNewFilePath (fileId, batchId, fileName) {
    const directoryPath = path.posix.join(process.cwd(),`files`, `batch-${batchId}`)
    const filePath = path.join(`${directoryPath}`,`${fileName}`)

    return { directoryPath, filePath, fileName }
}

async function GetDBFile (fileId) {
    const response = await db.file.findUnique({
        where: {
            id: fileId
        },
        include: {
            batch: true,
        }
    })

    return response
}

export async function GET(req, ctx) {
    const fileId = req.nextUrl.searchParams.get("fileId").replace("/", '');

    const dbFile = await GetDBFile(fileId)
    if (!dbFile) {
        return NextResponse.json({ message: `File with id of: '${fileId}', could not be found in our database.` }, { status: 404 })
    }

    const batchId = dbFile.batch.id

    const fileName = dbFile.name
    // let { filePath } = await GetNewFilePath(fileId, batchId, fileName)
    const filePath = dbFile.address

    const [id, extension] = fileId.split(".");
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';

    let fileStat;

    try {
        fileStat = await stat(filePath);
    } catch (err) {
        console.log("An error occurred while reading file with fsstat: " + err)
        return NextResponse.json({ error: `File not found + ${err}` }, { status: 404 });
    }

    const fileSize = fileStat.size;
    const range = req.headers.get("range");


    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
            return new Response(null, {
                status: 416,
                headers: {
                    "Content-Range": `bytes */${fileSize}`,
                    "Content-Type": mimeType,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Range",
                    'Content-Disposition': `filename="${fileName}"`,
                },
            });
        }

        const chunkSize = (end - start) + 1;
        const stream = createReadStream(filePath, { start, end });

        return new Response(stream, {
            status: 206,
            headers: {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": mimeType,
                "filename": fileName,
                'Content-Disposition': `filename="${fileName}"`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Range",
            },
        });
    } else {
        const stream = createReadStream(filePath);
        return new Response(stream, {
            headers: {
                "Content-Length": fileSize,
                "Content-Type": mimeType,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Range",
                'Content-Disposition': `filename="${fileName}"`,
            },
        });
    }
}

async function UploadFileToDB ({id, name, address, batchId, type, userId, metadata}) {
    const query = {
        data: {
            id,
            name,
            address,
            type,
            user: {
                connect: {
                    id: userId
                }
            },
            batch: {
                connect: {
                    id: batchId
                }
            },

        }
    }

    if (metadata) {
        query.data.data = JSON.stringify(metadata)
    }

    console.log(query.data.batch)

    const response = await db.file.create(query)
    return response
}

export const POST = auth(async function POST(req) {

    try {
        if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        const auth = req.auth

        let   files = []

        const formData = await req.formData();
        if (!formData.has('files')) {
            return NextResponse.json({ message: "No 'files', provided" }, { status: 401 })
        }
        if (!formData.has('batchId')) {
            return NextResponse.json({ message: "No 'batchId', provided" }, { status: 401 })
        }

        const batchId = formData.get('batchId')
        const batch = await GetUniqueBatch(batchId)
        if (!batch) {
            return NextResponse.json({ message: `Did not find batch with id: '${batchId}'` }, { status: 404 })
        }

        const fileCount = formData.getAll('files').length

        console.log("files: " + formData.getAll('files').map((f) => f.name))

        for (let i = 0; i < fileCount; i++) {
            const file = formData.getAll('files')[i]

            const extension = file.name.split('.').pop()

            const cleanFileName = cleanFilename(file.name.split('.').shift())
            const identifier = await GenerateUniqueIdentifier(new Date())
            const filename = `${identifier}`

            try {
                let uploaded = null

                if (mime.lookup(extension).startsWith("video")) {
                    uploaded = await VideoFileUpload({
                        file, batchId, auth
                    })
                }
                else {
                    uploaded = await DefaultFileUpload({
                        file, batchId, auth
                    })
                }

                files = [uploaded, ...files]
            } catch (err) {
                logger.error("Error uploading file with default uploader. ", err)
                Response.json(err, {status: 500})
            }
        }


        return NextResponse.json({
            status:"success",
            data: {
                files,
                user: auth.user
            }, 
        })
    } catch (err) {
        return NextResponse.json({
            error: err.message
        }, {
            status: 505
        })
    }

    async function DefaultFileUpload ({
        file,
        batchId,
        auth
    }) {

                logger.info("Uploading with default uplaoder...")


                const extension = file.name.split('.').pop()
                const name = file.name.split('.').shift()
                const cleanFileName = cleanFilename(name)
                const identifier = await GenerateUniqueIdentifier(new Date())
                const storedName = `${identifier}.${extension}`

                const defaultDirectory = "_default"

                const directoryPath = path.posix.join(process.cwd(),`files`, `batch-${batchId}`, defaultDirectory)
                const filePath = path.join(`${directoryPath}`,storedName)
                const mimeType = mime.lookup(filePath) || 'application/octet-stream';

                try {
                    if (!existsSync(directoryPath)) {
                        mkdirSync(directoryPath, { recursive: true });
                        console.log(`Group Directory '${directoryPath}' created.`);
                    } else {
                        // console.log(`Group Directory: '${directoryPath}'`);
                    }
                } catch (err) {
                    console.log("Received error creating directory", {directoryPath, filePath})
                    return  NextResponse.json({status:"fail",data:err})
                }

                // Produce File

                const url = encodeURI(`/api/v1/files?fileId=${identifier}`)

                const dbEntry = await UploadFileToDB({
                    id: identifier,
                    name: `${cleanFileName}.${extension}`,
                    address: filePath,
                    batchId: batchId,
                    type: mimeType,
                    userId: auth.user.id
                })

                const data = {
                    file,
                    name: cleanFileName,
                    mimeType,
                    dbEntry,
                    url
                }

                await pump(file.stream(), createWriteStream(filePath));

                console.log(data)
                // console.log(auth.user)

                return data
    }

    async function VideoFileUpload ({
        file,
        batchId,
        auth
    }) {

                logger.info("Uploading with video uplaoder...")


                const extension = file.name.split('.').pop()
                const name = file.name.split('.').shift()
                const cleanFileName = cleanFilename(name)
                const identifier = await GenerateUniqueIdentifier(new Date())
                const storedName = `${identifier}.${extension}`

                const defaultDirectory = "_video"

                const directoryPath = path.posix.join(process.cwd(),`files`, `batch-${batchId}`, defaultDirectory, identifier)
                const filePath = path.join(`${directoryPath}`,`original.${extension}`)
                const mimeType = mime.lookup(filePath) || 'application/octet-stream';

                const streamPath = path.posix.join(directoryPath, 'stream')
                if (!existsSync(streamPath)) {
                    mkdirSync(streamPath, { recursive: true })
                }
                const playlistPath = path.join(streamPath, 'playlist.m3u8');

                try {
                    if (!existsSync(directoryPath)) {
                        mkdirSync(directoryPath, { recursive: true });
                        console.log(`Group Directory '${directoryPath}' created.`);
                    } else {
                        // console.log(`Group Directory: '${directoryPath}'`);
                    }
                } catch (err) {
                    console.log("Received error creating directory", {directoryPath, filePath})
                    return  NextResponse.json({status:"fail",data:err})
                }

                // Produce File

                const url = encodeURI(`/api/v1/files?fileId=${identifier}`)
                await pump(file.stream(), createWriteStream(filePath));
                
                let probed
                try {   
                    probed = await ProbeVideo(filePath)
                } catch (err) {
                    logger.error("Error caused when probing")
                    await unlink(filePath)
                    return;
                }
                logger.info(JSON.stringify(probed, null, 4))

                const dbEntry = await UploadFileToDB({
                    id: identifier,
                    name: `${cleanFileName}.${extension}`,
                    address: filePath,
                    batchId: batchId,
                    type: mimeType,
                    userId: auth.user.id,
                    metadata: {
                        size: probed.size
                    }
                })

                const data = {
                    file,
                    name: cleanFileName,
                    mimeType,
                    dbEntry,
                    url
                }



                try {
                    await CreateVideoThumbnails({
                        filePath, directoryPath,
                        size: ScaleDimensions(probed.size.width, probed.size.height, 720)
                    })
                } catch (err) {
                    logger.error("Error generting thumbnails: " + err)
                }
                await CreateVideoPlaylistFile({
                    filePath, streamPath, playlistPath, identifier, fileName: storedName
                })

                await unlink(filePath)

                return data
    }
}
)

function ScaleDimensions(width, height, maxWidth) {
    if (width <= maxWidth) {
        return { width, height }; // No scaling needed
    }

    const aspectRatio = height / width;
    const newWidth = maxWidth;
    const newHeight = Math.round(newWidth * aspectRatio);

    return { width: newWidth, height: newHeight };
}

async function ProbeVideo(path) {
    return new Promise((resolve, reject) => {
        Ffmpeg.ffprobe(path, (err, metadata) => {
            if (err) {
                logger.error("FFprobe error:", err);
                return reject(new Error("Failed to probe video metadata"));
            }

            if (!metadata || !metadata.streams || metadata.streams.length === 0) {
                logger.error("No valid streams found in metadata:", metadata);
                return reject(new Error("No valid video streams found"));
            }

            // Find the first video stream with valid dimensions
            const videoStream = metadata.streams.find(stream => stream.width && stream.height);

            if (!videoStream) {
                logger.error("No video stream with valid width/height found");
                return reject(new Error("No valid video stream with resolution data"));
            }

            const size = {
                width: videoStream.width,
                height: videoStream.height
            };

            resolve({ size });
        });
    });
}


async function CreateVideoThumbnails({ filePath, directoryPath, size }) {
    return new Promise((resolve, reject) => {
        logger.info("Generating thumbnail for video");

        try {
            const thumbnailPath = path.join(directoryPath, "thumb");
            if (!existsSync(thumbnailPath)) {
                mkdirSync(thumbnailPath, { recursive: true });
            }

            const ffmpeg_path = process.env.FFMPEG_PATH;
            const command = new Ffmpeg();

            command.setFfmpegPath(ffmpeg_path);
            command.input(filePath)
                .on('end', () => {
                    logger.info('Thumbnails generated successfully!');
                    resolve(thumbnailPath); // Resolve the promise with the thumbnail path
                })
                .on('error', (err, stdout, stderr) => {
                    logger.error('Error generating thumbnails:', err);
                    logger.error('FFmpeg stdout:', stdout);
                    logger.error('FFmpeg stderr:', stderr);
                    reject(err); // Reject the promise with the error
                })
                .screenshots({
                    count: 1, // Number of thumbnails
                    folder: thumbnailPath,
                    size: `${size.width}x${size.height}`, // Thumbnail size
                    filename: 'thumbnail-%i.png' // %i will be replaced with index
                });

        } catch (err) {
            logger.error(err);
            reject(err);
        }
    });
}


async function CreateVideoPlaylistFile({
    filePath, streamPath, playlistPath, identifier, fileName
}) {
    return new Promise((resolve, reject) => {
        logger.info("Generating video playlist");

        try {
            const ffmpeg_path = process.env.FFMPEG_PATH;
            const command = new Ffmpeg();

            if (!ffmpeg_path) {
                logger.error("FFmpeg path is not set in environment variables.");
                return reject(new Error("FFmpeg path is not configured"));
            }

            command.setFfmpegPath(ffmpeg_path)
                .input(filePath)
                .outputOptions([
                    '-preset veryfast',
                    '-g 48',
                    '-sc_threshold 0',
                    '-hls_time 10', // 10-second segments
                    '-hls_list_size 0',
                    '-hls_segment_filename', `${path.posix.join(streamPath, "segment_%03d.ts")}`,
                    "-hls_base_url", `/api/v1/files/video?v=${identifier}&s=`
                ])
                .output(playlistPath)
                .on('end', () => {
                    logger.info("Finished video compression");
                    resolve({ message: "Playlist created successfully", playlistPath });
                })
                .on('progress', (progress) => {
                    logger.info({
                        message: "FFmpeg Progress",
                        percent: progress.percent,
                        frame: progress.frames,
                        fps: progress.currentFps,
                        time: progress.timemark
                    });
                })
                .on('error', (err) => {
                    logger.error("FFmpeg Error:", JSON.stringify(err, null, 4));
                    reject(new Error(`FFmpeg failed: ${err.message}`));
                })
                .run();
        } catch (err) {
            logger.error("Unexpected error:", err);
            reject(err);
        }
    });
}


// export const POST = auth(function POST(req) {
//     if (req.auth) return NextResponse.json(req.auth)
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
//   })