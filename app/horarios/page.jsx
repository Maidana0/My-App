import styles from "@/styles/Horarios.module.css"
import { amatic } from "../layout"
import HorariosPage from "@/components/horarios/HorariosPage"
export const metadata = { title: "Horarios" }

// POSTERIORMENTE TENGO QUE PONER UNA BASE DE DATOS PARA CADA USUARIO
const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves',
    // 'Viernes', 'Sábado'
];

const hours = [
    '08:00 a 10:00', '10:00 a 12:00',
    // '12:00 a 14:00', '14:00 a 16:00',
    // '16:00 a 18:00', '18:00 a 19:00',
    '12:00 a 19:00',
    '19:00 a 21:00', '21:00 a 23:00'
];

export default function Horarios() {

    return (

        <HorariosPage font={amatic.className} styles={styles} days={weekDays} hours={hours} />

    )
}

