import { db } from '@/lib/db';
import sharp from 'sharp';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from "fs"
import logger from 'logger.mjs';


// Image metadata
export const alt = 'Batch image';
export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/jpeg';
export const fonts = {

}

async function getCompressedImageBase64(filePath, width = 300, height = 300, quality = 80) {
  try {
    const imageBuffer = await sharp(filePath)
      .resize(width, height, { fit: 'inside' }) // Resize image to fit within specified dimensions
      .jpeg({ quality }) // Compress the image with specified quality (default: 80%)
      .toBuffer(); // Convert the image to a buffer

    return imageBuffer.toString('base64'); // Return Base64 encoded string
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
}

// Image generation
export async function GET(req) {
  const bId = req.nextUrl.searchParams.get('b') || 'debug' // background
  let batch = null
  try {
    batch = await db.batch.findUnique({
      where: {
        id: bId,
      },
      include: {
        files: {
          take: 4,
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    })
  } catch (err) {
    console.error(err)
    return notFound()
  }

  if (!batch || !batch?.files) {
    return NextResponse.json({error: "Batch not found"}, {status: 400})
  }

  let previews = []
  await Promise.all(batch.files.map(async (f) => {
    const _ = f
    let address = null
    if (f.type.startsWith("video")) {
        address = path.posix.join(process.cwd(),`files`, `batch-${batch.id}`, "_video", f.id, "thumb")
        address = path.posix.join(address, `thumbnail-1.png`)
      }
      if (f.type.startsWith("image")) {
        address = path.posix.join(f.address)
      }
      if (address == null) { return; }
      if (!fs.existsSync(address)) {
        return;
      }
      const prev = {
        title: f.title,
        id: f.id,
        image: await getCompressedImageBase64(address, 256, 256, 50)
      }
      previews = [...previews, prev]
  }))

  let amount = previews.length
  amount = Math.max(1, Math.min(4, amount))

  const style = [
    {
      height: 512,
      width: 512
    },
    {
      height: 256,
      width: 512
    },
    {
      height: 256,
      width: 512
    },
    {
      height: 256,
      width: 256
    }
  ]

  const title = batch.name

  return new ImageResponse(
    (
      // JSX Element for the Open Graph image
      <div
        style={{
          display: 'flex',
          flexWrap: "wrap",
          flexDirection: "row",
          position: "relative",
        }}
      >
        {previews.map((f) => {

          return (
            <img
              key={f.id}
              src={`data:image/jpeg;base64, ${f.image}`}
              alt={`Image ${f.id}`}
              width={256}
              height={256}
              style={{
                width: 256, // Full width
                height: 256,
                objectFit: 'cover', // Ensure images cover their space
                ...style[amount-1]
              }}
            />
            )
          })}

        <div style={{ display: "flex", position: "absolute", ...size, alignItems: "center", justifyContent: "center"}}>
            <div style={{maxWidth: 300, width: "auto", wordBreak: "break-all", borderRadius: 8, background: "black", display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", padding: 16, lineHeight: 1,fontSize: 64, fontWeight: "900", color: "white"}}>
              {title.split().map((c, ci) => {
                return (
                  <span key={ci}>{c}</span>
                )
              })}
            </div>
        </div>

      </div>
    ),
    {
      // Re-use the exported size configuration
      ...size,
    }
  );
}
