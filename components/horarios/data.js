export const today = new Date().getDay() - 2;

const data = Object.freeze(
    {
        Lunes: {
            '19:00 a 21:00': { name: 'Computacion II', info: `Aula: ${0}` },
            '21:00 a 23:00': { name: 'Computacion II', info: `Aula: ${0}` },
        },
        Martes: {
            '08:00 a 10:00': { name: 'Historia de la Ed. Argentina', info: `Aula: ${0}` },
            '10:00 a 12:00': { name: 'Historia de la Ed. Argentina', info: `Aula: ${0}` },
            '19:00 a 21:00': { name: 'Curso de Python', info: 'CoderHouse' }
        },
        Miércoles: {
            '08:00 a 10:00': { name: 'Historia de la Ed. Argentina', info: `Aula: ${0}` },
            '10:00 a 12:00': { name: 'Historia de la Ed. Argentina', info: `Aula: ${0}` },
            '19:00 a 21:00': { name: 'Computacion II', info: `Aula: ${0}` },
            '21:00 a 23:00': { name: 'Computacion II', info: `Aula: ${0}` },
        },
        Jueves: {
            '19:00 a 21:00': { name: 'Curso de Python', info: 'CoderHouse' }
        },
        Viernes: {

        },
        Sábado: {

        }
    }
)

export default data