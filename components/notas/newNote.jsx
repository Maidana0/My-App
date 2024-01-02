"use client"
import { useState } from "react"
import { time } from "../utils"


const NewNote = ({ styles, list, setList }) => {
    const date = time()
    const [note, setNote] = useState({ date, text: '' })

    const addNote = (e) => {
        e.preventDefault()
        setList([...list, note])
        setNote({ date: time(), text: '' })
    }
    return (
        <>
            <form id={"new"} className={`${styles.note} ${styles.new_note}`}
                onSubmit={addNote}>
                <textarea autoComplete="off" required
                    placeholder="Nueva nota..."
                    name="text" value={note.text}
                    onChange={async (e) => setNote({ ...note, [e.target.name]: e.target.value })}
                >
                </textarea>
                <div>
                    <small title={date.full_date}>{date.date_y}</small>
                    <button type="submit">
                        Agregar
                    </button>
                </div>
            </form>



        </>
    )
}

export default NewNote