import styles from "@/styles/Tasks.module.css"
import dynamic from "next/dynamic"

export const metadata = {
    title: "Tareas",
    description: "Podras observar una lista de tareas perteneciente a las tareas que tienes por hacer y otra lista mostrnadote las tareas que ya lograste realizar."
}

const NotFound = dynamic(() => import("@/app/not-found"), { ssr: false })

const Title = dynamic(() => import("@/components/Title"))
const Search = dynamic(() => import("@/components/Search"), { ssr: false })

const List = dynamic(() => import("@/components/tasks/List"), {
    loading: () => <p style={{ margin: "auto" }}>Cargando Tareas...</p>,
    ssr: false,
})

const paths = [
    { name: "en progreso", path: "/tareas/en-progreso" },
    { name: "realizadas", path: "/tareas/realizadas" },
]


export default function Page({ params }) {
    const { list } = params
    const correctParams = list == "pendientes" || paths.some(({ path }) => path.split("/").pop() == list);
    if (!correctParams) { return <NotFound message={"En tareas, no existe la siguiente sección: /" + list}/> }

    return (
        <>
            <Title linkTitle={{ name: "Mis Tareas", path: "/tareas/pendientes" }} linkContent={paths} />
            <Search from={"tarea"} query={"task"} />

            <div className={`d-flex f-column-center ${styles.tasks_list_container}`}>
                <List
                    list={list}
                    styles={styles}
                />
            </div>
        </>
    )
}