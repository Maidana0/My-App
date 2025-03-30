import styles from "@/styles/Tasks.module.css"
import dynamic from "next/dynamic"
import { MdOutlineDoneAll } from "react-icons/md";
import { GiMuscleFat } from "react-icons/gi";
import Title from "@/components/Title"
import NotFound from "@/app/not-found"

export const metadata = {
    title: "Tareas",
    description: "Podras observar una lista de tareas perteneciente a las tareas que tienes por hacer y otra lista mostrnadote las tareas que ya lograste realizar."
}


const Search = dynamic(() => import("@/components/filters/Search"))
const SortBy = dynamic(() => import("@/components/filters/SortBy"))

const List = dynamic(() => import("@/components/tasks/List"))

const paths = [
    { name: <><GiMuscleFat /> en progreso</>, path: "/tareas/en-progreso" },
    { name: <><MdOutlineDoneAll /> realizadas</>, path: "/tareas/realizadas" },
]


export default async function Page(props) {
    const params = await props.params;
    const { list } = params
    const correctParams = list == "pendientes" || paths.some(({ path }) => path.split("/").pop() == list);
    if (!correctParams) { return <NotFound message={"En tareas, no existe la siguiente sección: /" + list} /> }

    return (
        <>
            <Title linkTitle={{ name: "Mis Tareas Pendientes", path: "/tareas/pendientes" }} linkContent={paths} />
            <div
                className="d-flex flex-wrap justify-content-evenly"
                style={{ gap: "1rem" }}
            >
                <Search from={"tarea"} query={"task"} />

                {/* <SortBy
                    defaultOption={"Categorias"}
                    name={"category"}
                /> */}
            </div>


            <div className={`d-flex f-column-center ${styles.tasks_list_container}`}>
                <List
                    list={list}
                    styles={styles}
                />
            </div>
        </>
    )
}