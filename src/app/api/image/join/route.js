import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Dynamic Images';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export async function GET(req) {
  const bg = req.nextUrl.searchParams.get('bg') || 'white' // background
  const imageParam = req.nextUrl.searchParams.get('images');
  const images = imageParam ? imageParam.split(',') : [];

  return new ImageResponse(
    (
      // JSX Element for the Open Graph image
      <div
        style={{
          display: 'flex',
          flexDirection: 'row', // Stack images vertically
          background: bg,
          width: '100%',
          height: '100%',
          gap: "1rem"
        }}
      >
        {images && images.map((img, i) => (
          <img
            key={`${img}-${i}`}
            src={img}
            alt={`Image ${i + 1}`}
            style={{
              flex: 1, // Each image takes an equal portion of the vertical space
              width: '100%', // Full width
              height: '100%',
              objectFit: 'cover', // Ensure images cover their space
            }}
          />
        ))}
      </div>
    ),
    {
      // Re-use the exported size configuration
      ...size,
    }
  );
}
