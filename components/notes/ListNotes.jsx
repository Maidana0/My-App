"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import OneNote from "./OneNote"
import fetchData from "@/utils/fetch"
import dynamic from "next/dynamic"

const NewNote = dynamic(() => import("./NewNote"), { ssr: false })
const Error = dynamic(() => import("@/components/Error"), { ssr: false })


const ListNotes = ({ styles }) => {
  const [error, setError] = useState({ error: false, message: "", status: 404 })
  const [listNotes, setListNotes] = useState([])
  const [changesNotes, setChangesNotes] = useState(false)

  const handleChangesNotes = () => setChangesNotes(!changesNotes)

  // query params
  const text = useSearchParams().get("text")
  const sort = useSearchParams().get("sort") == "-1" ? useSearchParams().get("sort") : false

  useEffect(() => {
    const path = "notes?" + (text ? `text=${text}&` : '') + (sort ? `sort=${sort}` : '')

    const getNotes = async () => {
      const data = await fetchData(path, { isLocalReq: true })
      if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
        setError({ error: true, message: data.message, status: data.statusCode ? data.statusCode : 404 })
        return
      }
      setListNotes(data)
    }
    getNotes()
  }, [text, sort, changesNotes])

  if (error.error) return <Error message={error.message} status={error.status} height={"100%"} />
  else return (
    <div className={styles.notes_container}>

      {
        !text & sort
          ? <NewNote setError={setError} styles={styles} updateList={handleChangesNotes} />
          : ""
      }

      {
        listNotes.map((note, i) => (
          <OneNote key={i} setError={setError} updateList={handleChangesNotes} note={note} styles={styles} />
        ))
      }

      {
        !text & !sort && <NewNote setError={setError} styles={styles} updateList={handleChangesNotes} />
      }

    </div>
  )
}

export default ListNotes