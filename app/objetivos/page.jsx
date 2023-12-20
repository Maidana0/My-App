import styles from "@/styles/Agenda.module.css"
import ObjetivosPage from "@/components/objetivos/ObjetivosPage"

export const metadata = { title: "Objetivos" }

export default function Agenda() {
    return (
        <ObjetivosPage styles={styles}/>
    )
}