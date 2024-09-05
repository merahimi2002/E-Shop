/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '', // Specify port if needed, or leave empty
                pathname: '/**', // Allows all paths under the domain
            },
        ],
    },
};

export default nextConfig;
