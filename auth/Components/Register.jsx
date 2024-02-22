import Buttons from "./Buttons"
import { RegisterForm } from "./Forms"

const Register = ({ styles, handleClickModal }) => {

  return (
    <div className={`d-flex ${styles.register_modal}`}>
      <div className={`d-flex f-column-center ${styles.register_contain}`}>
        <h3>Crear Usuario </h3>
        <RegisterForm styles={styles} />

        <p><small>Puedes registrarte con: </small></p>
        <Buttons
          styles={styles}
          button={{ text: "Cerrar", className: styles.btn_close, handleClickModal }}
        />
      </div>
    </div>
  )
}

export default Register