/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'aktuelt.tv',
            }
        ]
    }
};

export default nextConfig;
