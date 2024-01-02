"use client"
import { useState } from "react"
import styles from "@/styles/calendar/Modal.module.css"
import { CgCloseO } from "react-icons/cg";
import { RiTimeFill } from "react-icons/ri";

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

const Modal = ({ modal, dateStr }) => {

  const [fullDate, setFullDate] = useState({
    fullDay: true,
    title: '',
    date: dateStr ? dateStr : '',
    time: '',
    colors: 'false',
    color: '',
    textColor: ''
  })

  const handleOnChange = async (e) => {
    setFullDate({
      ...fullDate,
      [e.target.name]: e.target.value
    })
  }

  const add = () => {
    // const event = {
    //   title: title,
    //   start: `${fullDate.date}${fullDay ? '' : `T${fullDate.time}`}`
    // }
    console.log(fullDate)
    modal.setModal(!modal.modal)
  }
  return (
    <div className={styles.modal_container} >


      <form className={styles.form_calender}
        onSubmit={async (e) => { e.preventDefault() }}>

        <div className={`d-flex `} style={{ justifyContent: 'space-between', paddingLeft: '1rem' }}>
          <h2>Crear Evento</h2>
          <button className={styles.btn_close} onClick={() => modal.setModal(!modal.modal)}>
            <CgCloseO title="Cerrar" />
          </button>
        </div>

        <input type="text" name="title" value={fullDate.title} onChange={handleOnChange}
          placeholder="Evento o recordatorio" />



        <div className={styles.date_container}>
          <input type="date" name="date" value={fullDate.date} onChange={handleOnChange} />
          {
            fullDate.fullDay ? '' :
              <input type="time" name="time" value={fullDate.time} onChange={handleOnChange} />
          }
          <button className={`${styles.btn_time}`} onClick={() => setFullDate({ ...fullDate, fullDay: !fullDate.fullDay })}>
            {fullDate.fullDay
              ? <RiTimeFill title="Hora"/> : <CgCloseO title="Cancelar" />}
          </button>

        </div>



        <button type="button" name="colors"
          value={fullDate.colors == 'false' ? 'true' : 'false'} onClick={handleOnChange}>
          {fullDate.colors == 'false' ? "Elegir Colores" : "Cancelar"}
        </button>


        {fullDate.colors == 'false' ? ''
          :
          <div className="d-flex f-column-center">
            <div>
              <label>Color del Texto: </label>
              <input type="color" name="textColor"
                value={fullDate.textColor} onChange={handleOnChange} />
            </div>
            <div>

              <label>Color del Fondo: </label>
              <input type="color" name="color"
                value={fullDate.color} onChange={handleOnChange} />
            </div>
          </div>}


        <p className="event-text-contain" style={{ color: fullDate.textColor, backgroundColor: fullDate.color }}>
          {fullDate.time.length > 4
            ? <strong>{fullDate.time}</strong>
            : ''}
          {fullDate.title}
        </p>

        <button type="submit" onClick={add}>Agregar Evento</button>

      </form>
    </div >
  )
}

export default Modal