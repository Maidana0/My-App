"use client"
import { useState, useRef, useEffect } from 'react'
import { useSearchParams, } from 'next/navigation'
import Task from './Task'
import dynamic from 'next/dynamic'

const Form = dynamic(() => import("./Form"), { ssr: false })


const List = ({ list, styles }) => {
    const listContain = useRef()
    const task = useSearchParams().get('task')

    const [taskList, setTaskList] = useState([])
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        async function getTasks() {
            const status = list == 'pendientes' ? 'pending' : list == 'en-progreso' ? 'in-progress' : 'done'
            const queryParams = `?status=${status}&task=${task ? task : ''}`

            const res = await fetch('/api/tasks' + queryParams, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            setTaskList(data)
        }

        getTasks()
    }, [task, changes])


    const statusStyle = list == 'en-progreso' ? styles.in_progress : list == 'realizadas' ? styles.done : styles.pending

    return (
        <>
            <div ref={listContain} className={`d-flex  ${styles.list_container} ${statusStyle}`}>
                {
                    taskList.map((task, i) =>
                        <Task key={i} styles={styles} changes={{ changes, setChanges }} task={task} />)
                }

            </div>

            {
                list == "pendientes"
                    ? <Form styles={styles} setList={() => setChanges(!changes)} />
                    : ''
            }
        </>
    )
}

export default List