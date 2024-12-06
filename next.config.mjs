/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'aktuelt.tv',
            },
            {
                protocol: 'https',
                hostname: 'bamblingen.no',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            }
        ]
    }
};

export default nextConfig;
