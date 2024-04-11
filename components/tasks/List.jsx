"use client"
import { useState, useRef, useEffect } from 'react'
import { useSearchParams, } from 'next/navigation'
import Task from './Task'
import dynamic from 'next/dynamic'
import fetchData from '@/utils/fetch'

const Form = dynamic(() => import("./Form"), { ssr: false })
const Error = dynamic(() => import("@/components/Error"), { ssr: false })

const List = ({ list, styles }) => {
    const listContain = useRef()
    const task = useSearchParams().get('task')
    const [error, setError] = useState({ error: false, message: "", status: 404 })
    const [taskList, setTaskList] = useState([])
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        async function getTasks() {
            const status = list == 'pendientes' ? 'pending' : list == 'en-progreso' ? 'in-progress' : 'done'

            const queryParams = `?status=${status}&task=${task ? task : ''}`
            const path = 'tasks' + queryParams

            const data = await fetchData(path, { isLocalReq: true })
            if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
                setError({ error: true, message: data.message, status: data.statusCode ? data.statusCode : 404 })
                return
            }
            setTaskList(data)
        }
        getTasks()
    }, [task, changes])


    const statusStyle = list == 'en-progreso' ? styles.in_progress : list == 'realizadas' ? styles.done : styles.pending

    if (error.error) return <Error message={error.message} status={error.status} height={"100%"} />


    return (<>

        <div ref={listContain} className={`d-flex  ${styles.list_container} ${statusStyle}`}>
            {
                taskList.map((task, i) =>
                    <Task setError={setError} key={i} styles={styles} changes={{ changes, setChanges }} task={task} />)
            }

        </div>

        {
            list == "pendientes"
                ? <Form styles={styles} setList={() => setChanges(!changes)} setError={setError} />
                : ''
        }

    </>)
}

export default List