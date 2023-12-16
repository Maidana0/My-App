import styles from "@/styles/Agenda.module.css"
import AgendaPage from "@/components/agenda/AgendaPage"

export const metadata = { title: "Agenda" }

export default function Agenda() {
    return (
        <AgendaPage styles={styles}/>
    )
}