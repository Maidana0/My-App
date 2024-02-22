import Header from "@/components/pages/tasks/Header"
import styles from "@/styles/Tasks.module.css"
import NotFound from "@/app/not-found"
import dynamic from "next/dynamic"


export const metadata = {
    title: "Tareas",
    description: "Podras observar una lista de tareas perteneciente a las tareas que tienes por hacer y otra lista mostrnadote las tareas que ya lograste realizar."
}


const Search = dynamic(() => import("@/components/pages/Search"), { ssr: false })
const LocalLoading = dynamic(() => import("@/components/loads/LocalLoading"))
const List = dynamic(() => import("@/components/pages/tasks/List"), {
    ssr: false,
    loading: () => <LocalLoading num={2} />
})

export default async function Page({ params }) {
    const { list } = params
    if (list != "por-hacer" && list != "realizadas") return <NotFound />
    return (
        <>
            <Header list={list ? list : "por-hacer"} />
            <Search from={"tarea"} query={"task"} />
            <List
                list={list}
                styles={styles}
            />
        </>
    )
}