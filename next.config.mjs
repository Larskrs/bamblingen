/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'aktuelt.tv',
            },
            {
                protocol: 'http',
                hostname: 'bamblingen.no',
            },
            {
                protocol: 'http',
                hostname: 'localhost:3000',
            }
        ]
    }
};

export default nextConfig;
