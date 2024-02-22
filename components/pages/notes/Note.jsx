import { MdDelete, MdModeEdit, MdOutlineSaveAs } from "react-icons/md";
import { convertDate } from "../../../utils/utils";
import fetchData from "@/utils/fetch";
import { useState } from "react";


const Note = ({ styles, date, text, setListNotes }) => {
  let currentDate = convertDate(date)
  const [changeNote, setChangeNote] = useState(false)
  const [noteText, setNoteText] = useState(text)

  const deleteNote = () => {
    fetchData(`notes/${date}`, 'DELETE')
      .then(data => {
        data.notes ? setListNotes(data.notes) : setListNotes(data)
      })
  }

  const updateNote = () => {
    fetchData(`notes/${date}`, 'PUT', { text: noteText })
      .then(data => {
        data.notes ? setListNotes(data.notes) : setListNotes(data)
        setChangeNote(!changeNote)
      })
  }

  const editNote = () => setChangeNote(!changeNote)


  return (
    <article className={`${styles.note} ${changeNote ? styles.update_note : ''}`}>

      {
        changeNote
          ?
          <textarea autoComplete="off" required
            name="text" value={noteText}
            onChange={(e) => setNoteText(e.target.value)} />
          :
          <p>
            {text}
          </p>
      }


      <div className={styles.note_footer}>
        <small title={currentDate.full_date}>{currentDate.date_y}</small>

        <div className="d-flex">
          <button >
            {
              changeNote ?
                <MdOutlineSaveAs onClick={updateNote} title="Guardar" size="1.9em" />
                :
                <MdModeEdit onClick={editNote} title="Editar" size="1.9em" />
            }
          </button>
          <button onClick={deleteNote}>
            <MdDelete title="Borrar" size="1.9em" />
          </button>
        </div>

      </div>
    </article>
  )
}

export default Note