import { useState } from "react"
import { transformDate } from "@/utils/utils"
import fetchData from "@/utils/fetch"

import { UseContext } from "../context/Context";
import MicrophoneIcons from "../MicrophoneIcons";
import useSpeekToText from "@/hooks/useSpeechToText";


const NewNote = ({ styles, updateList, setError }) => {
    const [text, setText] = useState('')
    const date = transformDate(false, true)
    const { handleMessage } = UseContext()

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

    const addNote = async (e) => {
        e.preventDefault()
        if (text.trim(" ").length <= 1) return
        const data = await fetchData("notes", { method: "POST", body: { text }, isLocalReq: true })

        if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
            setError({ message: data.message.toString(), error: true, status: data.statusCode })
            return
        }

        data.message && handleMessage(data)
        updateList()
        setText('')

    }

    return (
        <form id={"newNote"} className={styles.new_note} onSubmit={addNote} >
            
            <textarea autoComplete="off" required
                placeholder="Nueva nota..."
                name="text"
                value={isListening ? text + (transcript.length ? (text.length ? " " : "") + transcript : "") : text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="d-flex">
                <small>{date}</small>

                <MicrophoneIcons isListening={isListening} handleListening={handleListening}/>

                <input type="submit" value="Agregar" />
            </div>

        </form>
    )
}

export default NewNote