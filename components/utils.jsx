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
        // date: `${date}/${month}`,
        date_y: `${date}/${month}/${year}`,
        full_date: `Fecha: ${date}/${month}/${year} - Hora: ${hours}:${minutes}`
    }

    return current_date
}

export const today = new Date().getDay() -1;
