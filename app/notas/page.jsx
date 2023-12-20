import NotasPage from "@/components/notas/NotasPage"
import styles from "@/styles/Notas.module.css"
export const metadata = {
    title: "Notas"
}

export default function Calendario() {
    return (
        <NotasPage styles={styles} />
    )
}

