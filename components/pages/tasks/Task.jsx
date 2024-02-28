import { useState } from 'react'
import { DeleteTask, UpdateTask } from "./TaskButtons";
import dynamic from "next/dynamic";
// IMPORTS TASKS BUTTONS 
const TaskPending = dynamic(() => import('@/components/pages/tasks/TaskButtons').then(mod => mod.TaskPending))
const TaskInProgress = dynamic(() => import('@/components/pages/tasks/TaskButtons').then(mod => mod.TaskInProgress))
const TaskDone = dynamic(() => import('@/components/pages/tasks/TaskButtons').then(mod => mod.TaskDone))

const TaskStop = dynamic(() => import('@/components/pages/tasks/TaskButtons').then(mod => mod.TaskStop))

const SetTask = dynamic(() => import('@/components/pages/tasks/TaskButtons').then(mod => mod.SetTask))
const SaveTask = dynamic(() => import('@/components/pages/tasks/TaskButtons').then(mod => mod.SaveTask))

const ViewTaskModal = dynamic(() => import('@/components/pages/tasks/TaskModal'))

export default function Task({ changes, task, styles }) {
    const [text, setText] = useState(task.task)
    const [boolText, SetBoolText] = useState(false)

    const editText = () => SetBoolText(!boolText)


    const handleClick = async (e) => {
        e.preventDefault()
        const data = await UpdateTask(task._id, task.status)
        if (data.sucess) {
            changes.setChanges(!changes.changes)
        }
    }

    return (
        <div className={`d-flex ${styles.task_container}`} >

            <div className="d-flex">
                {
                    task.status == 'done'
                        ? <TaskDone handleClick={handleClick} />
                        : task.status == 'in-progress'
                            ? <TaskInProgress handleClick={handleClick} />
                            : <TaskPending handleClick={handleClick} />
                }
            </div>



            <div className={styles.task_text}  >
                {
                    boolText
                        ? <textarea
                            required
                            autoComplete="off"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        : <p> {task.task} </p>
                }
            </div>


            <div className="d-flex">





                {
                    task.status == 'in-progress'
                        ? <TaskStop handleClick={async (e) => {
                            e.preventDefault()
                            const data = await UpdateTask(task._id, false, 'pending')
                            if (data.sucess) changes.setChanges(!changes.changes)
                        }} />


                        : task.status == 'pending'
                            ? boolText
                                ? <SaveTask handleClick={async (e) => {
                                    e.preventDefault()
                                    const data = await UpdateTask(task._id, false, false, text)
                                    if (data.sucess) {
                                        editText()
                                        changes.setChanges(!changes.changes)
                                    }
                                }} />
                                : <SetTask handleClick={editText} />



                            : <ViewTaskModal task={task} styles={styles} />
                }






                <DeleteTask changes={changes} id={task._id} />
            </div>
        </div>
    )
}