import { useState } from 'react'
import { deleteTask, updateTask } from "./TaskButtons";
import dynamic from "next/dynamic";
import { UseContext } from "../context/Context";



// IMPORTS TASKS BUTTONS 
const TaskPending = dynamic(() => import('@/components/tasks/TaskButtons').then(mod => mod.TaskPending))
const TaskInProgress = dynamic(() => import('@/components/tasks/TaskButtons').then(mod => mod.TaskInProgress))
const TaskDone = dynamic(() => import('@/components/tasks/TaskButtons').then(mod => mod.TaskDone))

const TaskStop = dynamic(() => import('@/components/tasks/TaskButtons').then(mod => mod.TaskStop))

const SetTask = dynamic(() => import('@/components/tasks/TaskButtons').then(mod => mod.SetTask))
const SaveTask = dynamic(() => import('@/components/tasks/TaskButtons').then(mod => mod.SaveTask))

const DeleteTaskIcon = dynamic(() => import('@/components/tasks/TaskButtons').then(mod => mod.DeleteTaskIcon))


const ViewTaskModal = dynamic(() => import('@/components/tasks/TaskModal'))

export default function Task({ setError, changes, task, styles }) {
  const { handleMessage } = UseContext()

  const [text, setText] = useState(task.task)
  const [boolText, SetBoolText] = useState(false)

  const editText = () => SetBoolText(!boolText)


  const handleClick = async (e) => {
    e.preventDefault()
    const data = await updateTask(task._id, task.status)

    if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
      setError({ message: data.message.toString(), error: true, status: data.statusCode })
      return
    }

    data.message && handleMessage(data)
    changes.setChanges(!changes.changes)

  }

  return (
    <div className={`d-flex ${styles.task_container}`} >

      <div className="d-flex">
        {
          task.status == 'done'
            ? <TaskDone handleClick={handleClick} />
            : task.status == 'in-progress'
              ? <TaskInProgress handleClick={handleClick} />
              : !boolText && <TaskPending handleClick={handleClick} />
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
              const data = await updateTask(task._id, false, 'pending')

              if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
                setError({ message: data.message.toString(), error: true, status: data.statusCode })
                return
              }

              changes.setChanges(!changes.changes)
              data.message && handleMessage(data)
            }} />


            : task.status == 'pending'
              ? boolText
                ? <SaveTask handleClick={async (e) => {
                  e.preventDefault()
                  if (task.task == text || text.trim() == "") return editText()

                  const data = await updateTask(task._id, false, false, text)

                  if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
                    setError({ message: data.message.toString(), error: true, status: data.statusCode })
                    return
                  }

                  editText()
                  changes.setChanges(!changes.changes)
                  data.message && handleMessage(data)

                }} />
                : <SetTask handleClick={() => {
                  setText(task.task)
                  editText()
                }} />



              : <ViewTaskModal task={task} styles={styles} changes={changes} handleMessage={handleMessage} />
        }






        {!boolText && task.status != "done" && <DeleteTaskIcon handleClick={async e => {
          e.preventDefault()
          const data = await deleteTask(task._id)

          if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
            setError({ message: data.message.toString(), error: true, status: data.statusCode })
            return
          }


          changes.setChanges(!changes.changes)

          data.message && handleMessage(data)

        }} />}
      </div>
    </div>
  )
}