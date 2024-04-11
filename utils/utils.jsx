import crypto from "crypto"
import { Buffer } from "buffer"

export const configToken = {
    httpOnly: true,
    secure: process.env.ENVIRONMENT == "production" ? true : false,
    // sameSite: "none",
    maxAge: 864000000,
    path: '/',
}

const secretKey = process.env.SECRET_KEY
const key = Buffer.from(secretKey, 'utf8');
const algorithm = 'aes-256-gcm';
const ivLength = 16;





export const encryptedToken = (token) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm,key, iv)

    const encryptedToken = cipher.update(token, "utf8", "base64") + cipher.final('base64');
    const tag = cipher.getAuthTag();

    const dataInString = {
        iv: iv.toString("hex"),
        token: encryptedToken,
        tag: tag.toString("hex")
    };

    const secureToken = `${dataInString.iv}MAIDANA${dataInString.token}MAIDANA${dataInString.tag}`
    return secureToken
}

export const decryptedToken = (encryptedToken) => {

    try {
        const [ivString, tokenString, tagString] = encryptedToken.split("MAIDANA")

        const decipher = crypto.createDecipheriv(algorithm,  key, Buffer.from(ivString, "hex"));
        decipher.setAuthTag(Buffer.from(tagString, "hex"));

        const decryptedToken = decipher.update(tokenString, "base64", "utf8") + decipher.final("utf8");
        return decryptedToken;

    } catch (error) {
        console.error("Error al descifrar el token: \n", error);
        return null;
    }
}




//  EN PROCESO DEL VIDEO
// const encryptedToken = Buffer.concat([cipher.update(token), cipher.final()])
// return {
//     iv: iv.toString()
// }

// encryptedToken += cipher.final('hex');
// aes-192-ccm
// const cipher = crypto.createCipheriv('aes-256-cbc', process.env.SECRET_KEY,);
// let encryptedToken = cipher.update(token, 'utf8', 'hex');
// encryptedToken += cipher.final('hex');

export function transformDate(dateString, onlyDate) {
    const date = dateString ? new Date(dateString) : new Date()
    const localDate = date.toLocaleString('es', { timeZone: process.env.TIME_ZONE })
    if (onlyDate) return localDate.split(',')[0]
    return 'Día: ' + localDate.split(',').join(' - Hora:')
}



export function time() {
    let today = new Date()
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let date = today.getDate();
    // 
    let hours = today.getHours()
    let minute = today.getMinutes()
    let minutes = minute < 10 ? `0${minute}` : minute
    // 
    let current_date = {
        date_y: `${date}/${month}/${year}`,
        full_date: `Fecha: ${date}/${month}/${year} - Hora: ${hours}:${minutes}`
    }
    return current_date
}

export const today = new Date().getDay() - 1;


export function createDate() {
    let currentDate = new Date()
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let hours = String(currentDate.getHours()).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    let seconds = String(currentDate.getSeconds()).padStart(2, '0');
    let milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`
}

export function convertDate(currentDateString) {
    let currentDate = new Date(currentDateString)
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');

    let hours = String(currentDate.getHours() + 3).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    // let seconds = String(currentDate.getSeconds()).padStart(2, '0');
    // let milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    return {
        date_y: `${day}/${month}/${year}`,
        full_date: `Fecha: ${day}/${month}/${year} - Hora: ${hours}:${minutes}`
    }
}