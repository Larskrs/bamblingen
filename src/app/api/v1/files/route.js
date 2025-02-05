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
import { cleanBatchname, cleanFilename, GenerateUniqueIdentifier } from "@/lib/fileLib"
import { auth } from '@/auth';
import { ConnectOrCreateCategoryTags } from '@/lib/articleLib';
import { db } from '@/lib/db';
import logger from 'logger.mjs';
import Ffmpeg from 'fluent-ffmpeg';



const SETTINGS = {
    defaultFolder: "_default",
    videoFolder: "_vidoe",
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


/*
export const POST = auth(async (req) => {

    try{
        const formData = await req.formData();

        // const groupId = formData.getAll('group')[0]

        // const group = await db.group.findUnique({
        //     where: {
        //         id: groupId
        //     }
        // })

        // const directoryPath = `./files/${groupId}`;;

        // if (!fs.existsSync(directoryPath)) {
        //     fs.mkdirSync(directoryPath);
        //     console.log(`Directory '${directoryPath}' created.`);
        // } else {
        //     console.log(`Directory '${directoryPath}' already exists.`);
        // }



        const file = formData.getAll('files')[0]
        const filePath = `./files/${file.name}`;
        await pump(file.stream(), fs.createWriteStream(filePath));
        return NextResponse.json({status:"success",data:file.size})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
    
})
*/

async function UploadFileToDB (id, name, address, batch, type, userId) {
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
                connectOrCreate: {
                    where: {
                      id: cleanBatchname(batch.toLowerCase()),
                    },
                    create: {
                      id: cleanBatchname(batch.toLowerCase()),
                      name: batch,
                      categories: { connectOrCreate: ConnectOrCreateCategoryTags(["debug", "testing", "development"]) },
                      user: {
                        connect: {
                            id: userId
                        }
                      },
                    },
                },
            }
        }
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

        const batchId = cleanBatchname(formData.get('batchId') || "debug")
        const userId = auth.user.id

        const fileCount = formData.getAll('files').length

        console.log("files: " + formData.getAll('files').map((f) => f.name))

        for (let i = 0; i < fileCount; i++) {
            const file = formData.getAll('files')[i]

            const extension = file.name.split('.').pop()

            const cleanFileName = cleanFilename(file.name.split('.').shift())
            const identifier = await GenerateUniqueIdentifier(new Date())
            const filename = `${identifier}-${cleanFileName}`

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
            message: "Error: " + err
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

                const cleanFileName = cleanFilename(file.name.split('.').shift())
                const identifier = await GenerateUniqueIdentifier(new Date())
                const filename = `${identifier}-${cleanFileName}`

                const defaultDirectory = "_default"

                const directoryPath = path.posix.join(process.cwd(),`files`, `batch-${batchId}`, defaultDirectory)
                const filePath = path.join(`${directoryPath}`,`${filename}.${extension}`)
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
    
                const dbEntry = await UploadFileToDB(
                    identifier,
                    `${cleanFileName}.${extension}`,
                    filePath,
                    batchId,
                    mimeType,
                    auth.user.id
                )
    
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

                const cleanFileName = cleanFilename(file.name.split('.').shift())
                const identifier = await GenerateUniqueIdentifier(new Date())
                const filename = `${identifier}-${cleanFileName}`

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

                const dbEntry = await UploadFileToDB(
                    identifier,
                    `${cleanFileName}.${extension}`,
                    filePath,
                    batchId,
                    mimeType,
                    auth.user.id
                )

                const data = {
                    file,
                    name: cleanFileName,
                    mimeType,
                    dbEntry,
                    url
                }

                await pump(file.stream(), createWriteStream(filePath));

                await CreateVideoPlaylistFile({
                    filePath, streamPath, playlistPath, identifier, fileName: filename
                })
                try {
                    await CreateVideoThumbnails({
                        filePath, directoryPath
                    })
                } catch (err) {
                    logger.error(err)
                }

                return data
    }
}
)

async function CreateVideoThumbnails ({
    filePath, directoryPath
}) {

    logger.info("Generating thumbnail for image")
    try {

        const thumbnailPath = path.join(directoryPath, "thumb")
        if (!existsSync(thumbnailPath)) {
            mkdirSync(thumbnailPath, { recursive: true })
        }

        const ffmpeg_path = process.env.FFMPEG_PATH
        const command = new Ffmpeg()

        command.input(filePath)
        .on('end', () => {
            console.log('Thumbnails generated successfully!');
        })
        .on('error', (err) => {
            console.error('Error generating thumbnails:', err);
        })
        .screenshots({
            count: 1, // Number of thumbnails
                folder: thumbnailPath,
                size: '480x270', // Thumbnail size
                filename: 'thumbnail-%i.png' // %i will be replaced with index
            });

        } catch (err) {
            logger.error(err)
        }
    }

    async function CreateVideoPlaylistFile ({
        filePath, streamPath, playlistPath, identifier,
        fileName,
    }) {
        const ffmpeg_path = process.env.FFMPEG_PATH
        const command = new Ffmpeg()
        
        command.setFfmpegPath(ffmpeg_path)
        .input(filePath)
        .outputOptions([
            '-preset veryfast',
            '-g 48',
            '-sc_threshold 0',
            '-hls_time 10', // 10 sek segmenter
            '-hls_list_size 0',
            '-hls_segment_filename', `${path.posix.join(streamPath, "segment_%03d.ts")}`,
            "-hls_base_url", `/api/v1/files/video?v=${identifier}&s=`
        ])
        .output(playlistPath)
        .on('end', async () => {
            // await unlink(filePath); // Slett originalfilen etter konvertering
            // res.json({ url: `/videos/${req.file.filename}/playlist.m3u8` });
        })
        .on('progress', (progress) => {
            logger.info(progress.percent)
            global?.io?.emit("video-compression-progress", JSON.stringify({
                name: fileName,
                progress: progress.percent
            }))
        })
        .on('error', (err) => {
            logger.error(err);
        })
        .run();
}

// export const POST = auth(function POST(req) {
//     if (req.auth) return NextResponse.json(req.auth)
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
//   })