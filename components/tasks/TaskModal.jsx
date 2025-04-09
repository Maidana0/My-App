import { useState } from "react"
import { MdOutlineRemoveRedEye, MdClose } from 'react-icons/md';
import { transformDate } from "@/utils/utils"
import { deleteTask, DeleteTaskIcon } from "./TaskButtons";

export default function ViewTaskModal({ task, styles, changes, handleMessage }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    setModalIsOpen(!modalIsOpen)
  }

  if (modalIsOpen) return (
    <div className={`d-flex ${styles.backdrop_modal}`}>
      <div className={styles.modal_container}>
        <div className={`d-flex justify-content-between ${styles.modal_header}`}>
          <h3>Detalles</h3>
          <MdClose onClick={handleClick} />
        </div>

        <div className={styles.modal_body}>

          <div className="d-flex justify-content-between" style={{ fontSize: "0.9rem" }}>
            <div className={styles.title}>
              <h4>Creada:   </h4>
              <span>{transformDate(task.createdAt, true)}</span>
            </div>

            <div className={styles.title}>
              <h4>Realizada:   </h4>
              <span>{transformDate(task.updatedAt, true)}</span>
            </div>
          </div>

          <div className={styles.title}>
            <h4>Categoría: </h4>
            <span>{task.category}</span>
          </div>

          <div className={styles.title}>
            <h4>Tarea:</h4>
            <p className={styles.content}>{task.task}</p>
          </div>


        </div>

        <div className="d-flex justify-content-evenly">
          <DeleteTaskIcon handleClick={async e => {
            setModalIsOpen(!modalIsOpen)
            const data = await deleteTask(task._id)
            handleClick()
            if (data.message == "Unauthorized" | data.fail | data.error | data.success == false) {
              setError({ message: data.message.toString(), error: true, status: data.statusCode })
              return
            }


            changes.setChanges(!changes.changes)

            data.message && handleMessage(data)

          }} />
        </div>
      </div>
    </div>
  )

  return <MdOutlineRemoveRedEye title="Ver" onClick={handleClick} />
}
