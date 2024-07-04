import fetchData from "@/utils/fetch";
import { IoSendSharp } from "react-icons/io5";
import { UseContext } from "../context/Context";
import MicrophoneIcons from "../MicrophoneIcons";
import useSpeekToText from "@/hooks/useSpeechToText";
import { useState } from "react";

const Form = ({ setList, setError, styles }) => {
    const { handleMessage } = UseContext()
    const [text, setText] = useState("")
    const { startListening, stopListening, isListening, transcript } = useSpeekToText({
        continuous: true,
        interimResults: true,
    })

    const handleListening = () => {
        if (isListening) {
            setText(prevText => prevText + (transcript.length ? (prevText.length ? " " : "") + transcript : ""))
            stopListening()
            return
        }
        startListening()
    }

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
            <div className="d-flex f-center" style={{width:"40px"}}>
            <MicrophoneIcons isListening={isListening} handleListening={handleListening} />
            </div>
            <textarea autoComplete="off" required
                placeholder="Nueva tarea..."
                name="task"
                value={isListening ? text + (transcript.length ? (text.length ? " " : "") + transcript : "") : text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* <input type="text" name="task" autoComplete="off" placeholder="Escribir nueva tarea..." /> */}
            <button type="submit" className="d-flex" >
                <IoSendSharp color="#fff" size={"1.7em"} title="Agregar tarea" />
            </button>
        </form>
    )
}

export default Form