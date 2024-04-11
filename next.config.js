/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode:false,
    env: {
        MY_API_URL: "http://localhost:4000",
        GOOGLE_API_KEY: "AIzaSyAfCyf5hHNbYKuy3BBqcJpEJj144JGVlrY",
        TIME_ZONE: "America/Argentina/Buenos_Aires",
        ENVIRONMENT: "development",
        SECRET_KEY:  "MyPersonalWebSite_Maidana_Franco"
       
    },
}
// "MyPersonalWebSite0123MaidanaFranco7"
// "una_cadena_secreta_de_longitud_32_para_clave_aes_256"

module.exports = nextConfig
