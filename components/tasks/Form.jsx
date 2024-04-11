import fetchData from "@/utils/fetch";
import { IoSendSharp } from "react-icons/io5";
import { UseContext } from "../context/Context";
const Form = ({ setList, setError, styles }) => {
    const { handleMessage } = UseContext()

    const handleSubmit = async function (e) {
        e.preventDefault()
        let task = e.target.task.value
        if (task) {
            if (task.trim(" ").length <= 1) return

            const data = await fetchData("tasks", { isLocalReq: true, method: "POST", body: { task } })

            if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
                setError({ message: data.message.toString(), error: true, status: data.statusCode })
                return
            }
            handleMessage(data)
            setList()
            e.target.task.value = ""

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