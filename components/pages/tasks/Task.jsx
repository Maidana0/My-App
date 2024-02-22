import { convertDate } from "@/utils/utils"
import { MdModeEdit, MdOutlineSaveAs, MdDeleteForever, MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox, MdAddTask } from "react-icons/md";
import { deleteTask, updateTaskState } from "./dataFunctions.js";
import { useState } from 'react'

const Task = ({ state, task, styles }) => {
    const [text, setText] = useState(task.task)
    const [editText, setEditText] = useState(false)

    const updateState = () => {
        updateTaskState(task, state)
    }

    const delTask = () => {
        deleteTask(task.date, state)
    }

    return (
        <div title={convertDate(task.date).full_date} className={styles.task_container}
        >
            <div>
                {
                    task.sucess
                        ?
                        <MdOutlineCheckBox
                            fontSize={'1.7em'} title="Deshacer"
                            className={`${styles.btn_check}`}
                            onClick={updateState}
                        />
                        : <MdOutlineCheckBoxOutlineBlank
                            fontSize={'1.7em'} title="Realizada"
                            className={`${styles.btn_check}`}
                            onClick={updateState}
                        />
                }

            </div>

            <div className={styles.task_text}  >
                {
                    editText ?
                        <textarea
                            required
                            autoComplete="off"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        :
                        <p>
                            {task.task}
                        </p>
                }
            </div>
            <div className={styles.task_btn_container}>

                {
                    editText ?
                        <MdOutlineSaveAs onClick={() => setEditText(!editText)} title="Guardar" size="1.7em" />
                        :
                        <MdModeEdit onClick={() => setEditText(!editText)} title="Editar" size="1.7em" />
                }


                <MdDeleteForever fontSize={'1.7em'} title="Borrar"
                    className={`${styles.btn_delete}`}
                    onClick={delTask}
                />
            </div>
        </div>
    )
}

export default Task