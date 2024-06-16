import dynamic from "next/dynamic"
import styles from "@/styles/Notes.module.css"

import { IoAdd } from "react-icons/io5";

const Title = dynamic(() => import("@/components/Title"))
const Search = dynamic(() => import("@/components/Search"), { ssr: false })
const ListNotes = dynamic(() => import("@/components/notes/ListNotes"), { ssr: false })

export const metadata = {
    title: "Notas",
    description: "Todas tus notas guardadas en un mismo sitio!. Tienes la posibilidad de crear más notas, editarlas y borrarlas a tu voluntad."

}
const aditional = [
    {
        name: <><IoAdd />Agregar Nota</>,
        path: "#newNote"
    }
]

export default function Notas() {
    return (
        <>
            <Title title={"Mis Notas"} linkContent={aditional} />
            <Search from={"nota"} query={"text"} />

            <ListNotes styles={styles} />
        </>
    )
}

