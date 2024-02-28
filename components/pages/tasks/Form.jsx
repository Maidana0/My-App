import { IoSendSharp } from "react-icons/io5";

const Form = ({ setList, styles }) => {
    const handleSubmit = async function (e) {
        e.preventDefault()
        let task = e.target.task.value
        if (task) {
            task = task.trim()
            if (task.length >= 1) {
                const res = await fetch('/api/tasks', {
                    method: 'POST',
                    header: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task })
                })
                const data = await res.json()

                if (data.sucess) {
                    setList()
                    e.target.task.value = ""
                }
            }
        }


    }

    return (
        <form className={`d-flex ${styles.form}`} onSubmit={handleSubmit}>
            <input type="text" name="task" autoComplete="off" placeholder="Escribir nueva tarea..." />
            <button type="submit" className="d-flex" >
                <IoSendSharp color="#fff" size={"1.7em"} title="Agregar tarea" />
            </button>
        </form>
    )
}

export default Form