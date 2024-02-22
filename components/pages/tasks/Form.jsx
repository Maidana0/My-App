import { IoSendSharp } from "react-icons/io5";
import { createTask } from "./dataFunctions.js";

const Form = ({ state, styles }) => {

    return (
        <form
            className={styles.form_task}
            onSubmit={e => {
                e.preventDefault()
                createTask(e.target.task.value, state)
                e.target.task.value = ""
            }}
        >
            <input type="text" name="task" autoComplete="off" placeholder="Escribir nueva tarea..." />
            <button type="submit" >
                <IoSendSharp />
            </button>
        </form>
    )
}

export default Form