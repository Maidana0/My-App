import { MdDelete, MdModeEdit } from "react-icons/md";



const Note = ({ styles, date, text }) => {
  return (
    <article className={`${styles.note}`}>

      <p>
        {text}
      </p>

      <div>
        <small title={date.full_date}>{date.date_y}</small>
        <div>
          <MdModeEdit title="Editar" size="1.6em" />
          <MdDelete title="Borrar" size="1.6em" />
        </div>
      </div>
    </article>
  )
}

export default Note