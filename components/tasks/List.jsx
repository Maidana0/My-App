"use client"
import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Task from "./Task"
import dynamic from "next/dynamic"
import fetchData from "@/utils/fetch"

const Form = dynamic(() => import("./Form"), { ssr: false })
const Error = dynamic(() => import("@/components/Error"), { ssr: false })

const List = ({ list, styles }) => {
    const listContain = useRef()
    const searchParams = useSearchParams();
    const task = searchParams.get("task");
    const category = searchParams.get("category") == "todas" ? "" : searchParams.get("category");
    const [error, setError] = useState({ error: false, message: "", status: 404 })
    const [taskList, setTaskList] = useState([])
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        async function getTasks() {
            const status = list == "pendientes" ? "pending" : list == "en-progreso" ? "in-progress" : "done"

            const queryParams = `?status=${status}&task=${task ?? ""}&category=${category ?? ""}`
            const path = "tasks" + queryParams

            const data = await fetchData(path, { isLocalReq: true })
            if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
                setError({ error: true, message: data.message, status: data.statusCode ? data.statusCode : 404 })
                return
            }
            setTaskList(data)
        }
        getTasks()
    }, [task, category, changes])

    // useEffect(() => {
    //     if (listContain.current) {
    //         setTimeout(() => {
    //             if (listContain.current) {
    //                 listContain.current.scrollTop = listContain.current.scrollHeight ?? 0;
    //             }
    //         }, 800)
    //     }
    // }, [taskList])

    const statusStyle = list == "en-progreso" ? styles.in_progress : list == "realizadas" ? styles.done : styles.pending

    if (error.error) return <Error message={error.message} status={error.status} height={"100%"} />


    return (<>

        <div ref={listContain} className={`d-flex  ${styles.list_container} ${statusStyle}`}>
            <Suspense fallback={<p style={{ margin: "auto" }}>Cargando Tareas...</p>}>
                {
                    taskList.map((task, i) =>
                        <Task setError={setError} key={i} styles={styles} changes={{ changes, setChanges }} task={task} />)
                }
            </Suspense>

        </div>

        {
            list == "pendientes"
                ? <Form styles={styles} setList={() => setChanges(!changes)} setError={setError} />
                : ""
        }

    </>)
}

export default List