"use client"
import { useState, useRef, useEffect } from 'react'
import { useSearchParams, } from 'next/navigation'
import Task from './Task'
import { getTasks } from './dataFunctions.js'
import dynamic from 'next/dynamic'

const Form = dynamic(() => import("./Form"), { ssr: false })

const List = ({ list, styles }) => {
    const listContain = useRef()
    const task = useSearchParams().get('task')
    const [taskList, setTaskList] = useState([])
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        getTasks(list, task, setTaskList, listContain.current)
    }, [task, changes])

    if (taskList.error) return <h2>Error</h2>
    return (
        <div className={styles.tasks_list_container}>
            <div ref={listContain} className={styles.list_container}>
                {
                    taskList.map((task, i) =>
                        <Task key={i} styles={styles} state={{ changes, setChanges }} task={task} />)
                }
            </div>

            {
                list != "realizadas" &&
                <Form styles={styles} state={{ changes, setChanges }} />
            }
        </div>
    )
}

export default List