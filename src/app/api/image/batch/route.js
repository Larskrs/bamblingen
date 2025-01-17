import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Batch image';
export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/jpeg';
export const fonts = {

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
          where: {
            type: { contains: "image" }
          },
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

  return new ImageResponse(
    (
      // JSX Element for the Open Graph image
      <div
        style={{
          display: 'flex',
          flexWrap: "wrap",
          flexDirection: "row",
          position: "relative",
          ...size,
        }}
      >
        {batch.files.map((f) => {
          
          const url = `http://localhost:3000/api/v1/files?fileId=${f.id}`
          const fileType = f.type.split("/").shift()
          let image = `/icons/icon_file_${fileType}.svg`
          
          if (fileType == "image") {
            image = url
          }
          
          return (
              <img
              key={image}
              src={image}
              alt={`Image ${image}`}
              width={size.width/4}
              height={size.height/4}
              style={{
                width: 256, // Full width
                height: 256,
                objectFit: 'cover', // Ensure images cover their space
              }}
              />
              )
            })}
        <div style={{ display: "flex", position: "absolute", ...size, alignItems: "center", justifyContent: "center"}}>
          <p style={{width: 450, wordBreak: "break-all", borderRadius: 8, background: "black", display: "flex", textAlign: "center", padding: 16, lineHeight: 1,fontSize: 64, fontWeight: "900", color: "white"}}>{batch.name}</p>
        </div>

      </div>
    ),
    {
      // Re-use the exported size configuration
      ...size,
    }
  );
}
