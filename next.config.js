/** @type {import('next').NextConfig} */
// "https://my-personal-back.vercel.app/"
// "http://localhost:4000"
const nextConfig = {
    // reactStrictMode:false,
    env: {
        MY_API_URL: process.env.NEXT_PUBLIC_MY_API_URL,
        MY_LOCAL_URL: process.env.NEXT_PUBLIC_MY_LOCAL_URL,
        GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        TIME_ZONE: process.env.NEXT_PUBLIC_TIME_ZONE,
        ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
        SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,

    },
    // staleTimes  (* experimental and subject to change *)
    experimental: {
        staleTimes: {
            dynamic: 60,
            static: 60 * 60 * 24,
        },
    },
}


module.exports = nextConfig
