import { useEffect, useState } from "react"
import { MdDelete, MdModeEdit, MdOutlineSaveAs } from "react-icons/md";
import fetchData from "@/utils/fetch";
import { transformDate } from "@/utils/utils";
import { UseContext } from "../context/Context";

import MicrophoneIcons from "../MicrophoneIcons";
import useSpeekToText, { isMobile } from "@/hooks/useSpeechToText";

const Parrafos = ({ text }) => {
  const parrafos = text.split("\n")
  return parrafos.map((parrafo, index) => (
    <p key={index}>{parrafo}</p>
  ))
}

const OneNote = ({ setError, note, updateList, styles }) => {
  const { handleMessage } = UseContext()
  const path = "notes/" + note._id

  const [text, setText] = useState(note.text)
  const [updateText, setUpdateText] = useState(false)

  const handleUpdate = async () => {
    if (text != note.text) {
      const data = await fetchData(path, { isLocalReq: true, method: "PUT", body: { text } })

      if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
        setError({ message: data.message.toString(), error: true, status: data.statusCode })
        return
      }


      data.message && handleMessage(data)
      updateList()
    }

    setUpdateText(!updateText)
  }

  const handleDelete = async () => {
    const data = await fetchData(path, { isLocalReq: true, method: "DELETE" })
    if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
      setError({ message: data.message.toString(), error: true, status: data.statusCode })
      return
    }

    data.message && handleMessage(data)
    updateList()
  }


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

  useEffect(() => {
    if (!isMobile()) return
    if (transcript.length > 2) {
      setText(prevText => prevText + (transcript.length ? (prevText.length ? " " : "") + transcript : ""))
    }
  }, [transcript])

  return (
    <div className={`${styles.note} ${updateText ? styles.updating_note : ""}`} >
      {
        updateText
          ?

          <textarea autoComplete="off" required minLength={2}
            placeholder="Editar nota..."
            name="text"
            value={isListening
              ? text + (transcript.length ? (text.length ? " " : "") + transcript : "")
              : text
            }
            onChange={(e) => isListening ? stopListening() : setText(e.target.value)}
          />
          : <div className={styles.p_container}>
            <Parrafos text={note.text} />
          </div>
      }

      <div className={`d-flex ${styles.note_footer}`}>
        <small>{transformDate(note.updatedAt, true)}</small>
        {
          updateText && <MicrophoneIcons isListening={isListening} handleListening={handleListening} />
        }

        <div className="d-flex" style={{ gap: "8px" }}>
          {
            updateText
              ? <MdOutlineSaveAs size={"1.45em"} onClick={handleUpdate} />
              : <MdModeEdit size={"1.45em"} onClick={() => {
                setText(note.text)
                setUpdateText(!updateText)
              }}
              />
          }
          {!updateText && <MdDelete size={"1.45em"} onClick={handleDelete} />}
        </div>
      </div>

    </div>
  )
}

export default OneNote