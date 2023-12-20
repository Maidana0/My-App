"use client"
import { useState } from "react"
// import styles from "@/styles/Modal.module.css"
import { CgCloseO } from "react-icons/cg";

const addEvent = () => {
  return (
    <input type="datetime-local" />

  )
}
// e= 
// allDay
// : 
// true

// date
// : 
// Thu Dec 21 2023 00:00:00 GMT-0300 (hora estándar de Argentina) {}

// dateStr
// : 
// "2023-12-21"

// dayEl
// : 
// td.fc-day.fc-day-thu.fc-day-future.fc-daygrid-day.day-empty

const Modal = () => {

  const [title, setTitle] = useState({ title: '' })
  const [date, setDate] = useState({ date: '' })
  const [dateTime, setDateTime] = useState({ time: '' })
  const [fullDay, setFullDay] = useState(true)

  const onChange = async (e) => {
    if (e.target.name == 'title') {
      setTitle({ [e.target.name]: e.target.value, })
    }
    if (e.target.name == 'date') {
      setDate({ [e.target.name]: e.target.value, })
    }
    if (e.target.name == 'time') {
      setDateTime({ [e.target.name]: e.target.value, })
    }
  }
  const add = () => {
    const event = {
      title: title.title,
      start: `${date.date}${fullDay ? '' : `T${dateTime.time}`}`
    }
    console.log(event)
  }



  return (
    <div className=" modal-container" >


      <form className={`form-calender`}
        onSubmit={async (e) => { e.preventDefault() }}>

        <div className="d-flex" style={{ justifyContent: 'space-between', paddingLeft: '1rem' }}>
          <h2>Crear Evento</h2>
          <button className="btn-close">
            <CgCloseO title="Cerrar" />
          </button>
        </div>


        <input type="text" name="title" value={title.title} onChange={onChange}
          placeholder="Evento o recordatorio" />

        <input type="date" name="date" value={dateTime.date} onChange={onChange} />


        <div className="d-flex f-column-center">
          <button type="button" onClick={() => setFullDay(!fullDay)}>
            {fullDay ? "Agregar Tiempo" : "Cancelar"}
          </button>
          {
            fullDay ? '' :
              <input type="time" name="time" value={dateTime.time} onChange={onChange} />
          }
        </div>



        <button type="submit" onClick={add}>Agregar Evento</button>

      </form>
    </div >
  )
}

export default Modal