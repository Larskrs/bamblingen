import { ImageResponse } from 'next/og';
import { getImageDimensions } from '@/lib/imgLib';
import { headers } from 'next/headers';

async function GetImageMeta (url, cb) {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
    return img;
};

export const runtime = 'edge';

// Image metadata
export const alt = 'Dynamic Images';
export const contentType = 'image/png';

export const upperPadding = 150;
export const targetWidth = 700;

// Image generation
export async function GET(req) {
    const bg = req.nextUrl.searchParams.get('bg') || 'white' // background
    const color = req.nextUrl.searchParams.get('color') || 'black' // background
    const image = req.nextUrl.searchParams.get('image');
    const caption = req.nextUrl.searchParams.get('caption');

    const mData = await getImageDimensions(image)
    const aspectRatio = mData.width / mData.height
    const size = {
        width: targetWidth,
        height: targetWidth / aspectRatio,
    }

    return new ImageResponse(
    (
      // JSX Element for the Open Graph image
        <div
            style={{
                display: 'flex',
                flexDirection: 'column', // Stack images vertically
                alignItems: "center",
                justifyContent: "center",
                background: bg,
                width: '100%',
                height: '100%',
                gap: "1rem"
            }}
        >
        <h1 style={{
            fontSize: "50px",
            margin: "0px",
            marginLeft: "32px",
            textAlign: "center",
            textAlignLast: "center",
            color: color,
        }}>{caption}</h1>
        <img
            src={image}
            alt={`Image ${image}`}
            width={size.width}
            height={size.height}
            style={{
                flex: 1, // Each image takes an equal portion of the vertical space
                width: '100%', // Full width
                height: '100%',
                objectFit: 'cover', // Ensure images cover their space
            }}
        />
        </div>
    ),
    {
      // Re-use the exported size configuration
    ...size,
    }
);
}
