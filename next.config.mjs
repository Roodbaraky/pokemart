/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[

            {
            protocol: 'https', 
            hostname: 'cdn1.iconfinder.com',
        },
        {
            protocol: 'https',
             hostname: "raw.githubusercontent.com"
        }
        ]
    }
};

export default nextConfig;
