import { useState } from "react"
import { MdOutlineRemoveRedEye, MdClose } from 'react-icons/md';

function transformDate(dateString) {
    const date = new Date(dateString)
    const localDate = date.toLocaleString('es', { timeZone: process.env.TIME_ZONE })
    return 'Día: ' + localDate.split(',').join(' - Hora:')
}

export default function ViewTaskModal({ task, styles }) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        setModalIsOpen(!modalIsOpen)
    }

    if (modalIsOpen) return (
        <div className={`d-flex ${styles.backdrop_modal}`}>
            <div className={styles.modal_container}>

                <div className={`d-flex ${styles.modal_header}`}>
                    <h3>Detalles</h3>
                    <MdClose onClick={handleClick} />
                </div>

                <h4>Fecha de Creación:</h4>
                <small>{transformDate(task.createdAt)}</small>

                <h4>Tarea:</h4>
                <p>{task.task}</p>

                <h4>Fecha de Realización:</h4>
                <small>{transformDate(task.updatedAt)}</small>
            </div>
        </div>
    )

    return <MdOutlineRemoveRedEye title="Ver" onClick={handleClick} />
}
