/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
        return [{
            source:'/api/specialPrice/:path*',
            headers:[
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, 
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            
            ]
        }]
    },
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
