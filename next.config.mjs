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
                hostname: 'www.bamblingen.no',
            }
        ]
    }
};

export default nextConfig;
