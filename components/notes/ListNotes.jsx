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
  const [sort, setSort] = useState(false)

  const handleChangesNotes = () => setChangesNotes(!changesNotes)

  // query params
  const text = useSearchParams().get("text")
  // const sort = useSearchParams().get("sort") == "-1" ? useSearchParams().get("sort") : false

  useEffect(() => {
    const path = "notes?" + (text ? `text=${text}&` : '') + (sort ? `sort=${sort}` : '')

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
    <>
      <div className={"d-flex " + styles.sort_select_contain}>
        <label htmlFor="sort">Ordenar desde la fecha:</label>
        <select name="sort" id="sort" onChange={(e) => { e.target.value != sort && setSort(e.target.value) }}>
          <option value={1} defaultChecked>más antigua</option>
          <option value={-1}>más reciente</option>
        </select>
      </div>


      <div className={styles.notes_container}>
        {
          !text & sort == -1
            ? <NewNote setError={setError} styles={styles} updateList={handleChangesNotes} />
            : ""
        }

        {
          listNotes.map((note, i) => (
            <OneNote key={i} setError={setError} updateList={handleChangesNotes} note={note} styles={styles} />
          ))
        }

        {
          !text & (!sort || sort == 1) && <NewNote setError={setError} styles={styles} updateList={handleChangesNotes} />
        }

      </div>
    </>
  )
}

export default ListNotes