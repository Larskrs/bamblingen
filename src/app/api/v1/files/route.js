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
import { auth } from '@/auth';
import { ConnectOrCreateCategoryTags, GenerateUniqueIdentifier } from '@/lib/articleLib';
import { db } from '@/lib/db';

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
        return NextResponse.json({ message: `File with id of: '${fileId}', could not be found in our database.` }, { status: 401 })
    }

    const batchId = dbFile.batch.id

    const fileName = dbFile.name
    let { filePath } = await GetNewFilePath(fileId, batchId, fileName)
    
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

async function UploadFileToDB (id, name, address, type, userId) {
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
                      id: 'debug',
                    },
                    create: {
                      id: 'debug',
                      name: "Debug Batch",
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

        const batchId = cleanFilename(formData.get('batchId'))
        const userId = auth.user.id

        const fileCount = formData.getAll('files').length

        console.log("files: " + formData.getAll('files').map((f) => f.name))

        for (let i = 0; i < fileCount; i++) {
            const file = formData.getAll('files')[i]
            
            const extension = file.name.split('.').pop()

            const cleanFileName = cleanFilename(file.name.split('.').shift())
            const identifier = await GenerateUniqueIdentifier(new Date())
            const filename = `${identifier}-${cleanFileName}`
            
            const directoryPath = path.posix.join(process.cwd(),`files`, `batch-${batchId}`)
            const filePath = path.join(`${directoryPath}`,`${filename}.${extension}`)
            const mimeType = mime.lookup(filePath) || 'application/octet-stream';
            

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

            const url = encodeURI(`/api/v1/files?fileId=${identifier}`)

            const dbEntry = await UploadFileToDB(
                identifier,
                `${filename}.${extension}`,
                filePath,
                mimeType,
                auth.user.id
            )

            const data = {
                file,
                name: filename,
                mimeType,
                dbEntry,
                url
            }

            await pump(file.stream(), createWriteStream(filePath));
            console.log(data)
            // console.log(auth.user)

            files = [...files, data]
        }


        return NextResponse.json({
            status:"success",
            data: {
                files,
                user: auth.user
            }, 
        })
            
            
}
)


// export const POST = auth(function POST(req) {
//     if (req.auth) return NextResponse.json(req.auth)
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
//   })