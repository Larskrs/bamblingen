// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';
import mime from 'mime-types';
import { NextResponse } from 'next/server';
import { existsSync, promises as fs, mkdir, mkdirSync } from 'fs';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);
import { stat } from 'fs/promises';
import { cleanFilename } from "@/lib/fileLib"

async function GetFilePath (fileId) {

    let filePath
    let fileName

    filePath = path.join(process.env.API_BASE_PATH,`\\files\\${fileId}`);
    fileName = fileId

    return { filePath, fileName}
}

export async function GET(req, ctx) {
    const fileId = req.nextUrl.searchParams.get("fileId").replace("/", '');

    let { filePath, fileName } = await GetFilePath(fileId)
    
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
                "Content-Disposition": `filename=${fileName}`
            },
        });
    } else {
        const stream = createReadStream(filePath);
        return new Response(stream, {
            headers: {
                "Content-Length": fileSize,
                "Content-Type": mimeType,
                "Content-Disposition": `filename="${cleanFilename(fileName)}"`
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

export async function POST (req) {
    console.log("Hello")

        const formData = await req.formData();

        const file = formData.getAll('files')[0]
        const extension = file.name.split('.').pop()

        const filename = cleanFilename(file.name)
        
        const directoryPath = path.join(process.env.API_BASE_PATH,`\\files`)
        const filePath = path.join(`${directoryPath}\\${filename.split('.').shift()}.${extension}`)


        try {
            if (!existsSync(directoryPath)) {
                mkdirSync(directoryPath);
                console.log(`Group Directory '${directoryPath}' created.`);
            } else {
                // console.log(`Group Directory: '${directoryPath}'`);
            }
        } catch (err) {
            console.log("Received error creating directory", {directoryPath, filePath})
            return  NextResponse.json({status:"fail",data:err})
        }

        // Produce File
        await pump(file.stream(), createWriteStream(filePath));
        console.log(file)
        return NextResponse.json({
            status:"success",
            data: {
                file
            }, 
            url: encodeURI(`${process.env.AUTH_URL}/api/files?fileId=${filename}`)})
    
    
}