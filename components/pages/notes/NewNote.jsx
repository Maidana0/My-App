import { useState } from "react"
import { convertDate, createDate } from "../../../utils/utils"
import fetchData from "@/utils/fetch"


const NewNote = ({ styles, setListNotes }) => {
    const [text, setText] = useState('')
    let currentDate = convertDate(createDate())
    const addNote = (e) => {
        e.preventDefault()
        fetchData('notes', 'POST', { text, date: createDate() }).then(data => {
            data.notes ? setListNotes(data.notes) : setListNotes(data)
            setText('')
        })
    }
    return (
        <form id={"new"} className={`${styles.note} ${styles.new_note}`}
            onSubmit={addNote}>
            <textarea autoComplete="off" required
                placeholder="Nueva nota..."
                name="text" value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className={styles.note_footer}>
                <small title={currentDate.full_date}>{currentDate.date_y}</small>
                <button type="submit">
                    Agregar
                </button>
            </div>
        </form>
    )
}

export default NewNote