import dynamic from "next/dynamic"
import styles from "@/styles/Notes.module.css"

import { IoAdd } from "react-icons/io5";

const Title = dynamic(() => import("@/components/Title"))
const Search = dynamic(() => import("@/components/filters/Search"), { ssr: false })
const SortBy = dynamic(() => import("@/components/filters/SortBy"), { ssr: false })
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

            <div className={`d-flex`}>
                <Search from={"nota"} query={"text"} />
                <SortBy
                    name={"sort"}
                    defaultOption={"Ordenar"}
                    staticOptions={[
                        { value: 1, label: "más antigua" },
                        { value: -1, label: "más reciente" },
                    ]}
                />
            </div>
            <ListNotes styles={styles} />
        </>
    )
}

