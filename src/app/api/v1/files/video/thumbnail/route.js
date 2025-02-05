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


async function GetFilePath (videoId) {

    let filePath
    let fileName

    filePath = path.posix.join(process.cwd(),`files`, videoId);
    fileName = videoId

    return { filePath, fileName}
}

async function GetNewFilePath (videoId, batchId, fileName) {
    const directoryPath = path.posix.join(process.cwd(),`files`, `batch-${batchId}`)
    const filePath = path.join(`${directoryPath}`,`${fileName}`)

    return { directoryPath, filePath, fileName }
}

async function GetDBFile (videoId) {
    const response = await db.file.findUnique({
        where: {
            id: videoId
        },
        include: {
            batch: true,
        }
    })

    return response
}

export async function GET(req, ctx) {
    const videoId = req.nextUrl.searchParams.get("v").replace("/", '');

    const dbFile = await GetDBFile(videoId)
    if (!dbFile) {
        return NextResponse.json({ message: `File with id of: '${videoId}', could not be found in our database.` }, { status: 404 })
    }

    const batchId = dbFile.batch.id

    const fileName = dbFile.name
    // let { filePath } = await GetNewFilePath(videoId, batchId, fileName)

    const dirPath = path.posix.join(process.cwd(),`files`, `batch-${batchId}`, "_video", videoId, "thumb")
    const filePath = path.posix.join(dirPath, `thumbnail-1.png`)
    
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