/** @type {import('next').NextConfig} */
// "https://my-personal-back.vercel.app/"
// "http://localhost:4000"
const nextConfig = {
    // reactStrictMode:false,
    env: {
        MY_API_URL: "https://my-personal-back.vercel.app",
        MY_LOCAL_URL: "",
        GOOGLE_API_KEY: "AIzaSyAfCyf5hHNbYKuy3BBqcJpEJj144JGVlrY",
        TIME_ZONE: "America/Argentina/Buenos_Aires",
        ENVIRONMENT: "production",
        SECRET_KEY: "MyPersonalWebSite_Maidana_Franco"

    },
}


module.exports = nextConfig
