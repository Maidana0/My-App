import { useEffect, useState } from "react"
import { transformDate } from "@/utils/utils"
import fetchData from "@/utils/fetch"
import { UseContext } from "../context/Context";
import MicrophoneIcons from "../MicrophoneIcons";
import useSpeekToText, { isMobile } from "@/hooks/useSpeechToText";
import { amatic } from "@/lib/fonts";


const NewNote = ({ styles, updateList, setError }) => {
    const [text, setText] = useState("")
    const date = transformDate(false, true)

    const { handleMessage } = UseContext()

    const { startListening, stopListening, isListening, transcript } = useSpeekToText({
        continuous: !isMobile(),
        interimResults: !isMobile(),
    })

    const handleListening = () => {
        if (isListening) {
            if (!isMobile()) {
                setText(prevText => prevText + (transcript.length ? (prevText.length ? " " : "") + transcript : ""))
            }
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
        setText("")
    }

    useEffect(() => {
        if (!isMobile()) return
        if (transcript.length > 2) {
            setText(prevText => prevText + (transcript.length ? (prevText.length ? " " : "") + transcript : ""))
        }
    }, [transcript])

    return (
        <form id={"newNote"} className={styles.new_note} onSubmit={addNote} >

            <textarea autoComplete="off" required
                placeholder="Nueva nota..."
                name="text"
                value={isListening
                    ? text + (transcript.length ? (text.length ? " " : "") + transcript : "")
                    : text
                }
                onChange={(e) => isListening ? stopListening() : setText(e.target.value)}
            />

            <div className="d-flex">
                <small>{date}</small>

                <MicrophoneIcons isListening={isListening} handleListening={handleListening} />

                <input type="submit" value="Agregar" className={amatic.className} />
            </div>

        </form>
    )
}

export default NewNote