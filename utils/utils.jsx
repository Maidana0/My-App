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

    let hours = String(currentDate.getHours()+3).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    // let seconds = String(currentDate.getSeconds()).padStart(2, '0');
    // let milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    return {
        date_y: `${day}/${month}/${year}`,
        full_date: `Fecha: ${day}/${month}/${year} - Hora: ${hours}:${minutes}`
    }
}