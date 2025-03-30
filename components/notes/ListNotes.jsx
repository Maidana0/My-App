"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import fetchData from "@/utils/fetch"
import dynamic from "next/dynamic"

const NewNote = dynamic(() => import("./NewNote"), { ssr: false })
const OneNote = dynamic(() => import("./OneNote"), { ssr: false })
const Error = dynamic(() => import("@/components/Error"), { ssr: false })

const ListNotes = ({ styles }) => {
  const [error, setError] = useState({ error: false, message: "", status: 404 })
  const [listNotes, setListNotes] = useState([])
  const [changesNotes, setChangesNotes] = useState(false)
  const searchParams = useSearchParams()

  const handleChangesNotes = () => setChangesNotes(!changesNotes)

  // query params
  const text = searchParams.get("text")
  const sort = searchParams.get("sort") || -1

  useEffect(() => {
    const path = "notes?" + (text ? `text=${text}&` : '') + `sort=${sort}`

    const getNotes = async () => {
      const data = await fetchData(path, { isLocalReq: true })
      if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
        console.log(data);
        if (data.error?.error) {
          setError({ error: true, message: data.error.message, status: 500 })
          return
        }
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
        !text && sort == -1
          ? <NewNote setError={setError} styles={styles} updateList={handleChangesNotes} />
          : ""
      }

      {
        listNotes.map((note, i) => (
          <OneNote key={i} setError={setError} updateList={handleChangesNotes} note={note} styles={styles} />
        ))
      }

      {
        !text && (!sort || sort == 1) && <NewNote setError={setError} styles={styles} updateList={handleChangesNotes} />
      }

    </div>
  )
}

export default ListNotes