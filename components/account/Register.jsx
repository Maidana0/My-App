"use client"
import dynamic from "next/dynamic"
import { UseAuthModalContext } from "../context/AuthModal"

const RegisterForm = dynamic(() => import("./RegisterForm"), { ssr: false, loading: () => <p>...</p> })
const Buttons = dynamic(() => import("./Buttons"), { ssr: false })

const Register = ({ styles }) => {
  const { isOpen, closeModal } = UseAuthModalContext()

  if (!isOpen) return null;
  else return (
    <dialog className={`d-flex ${styles.register_modal}`} id="registerModal" onClick={closeModal}>
      <div className={`d-flex f-column-center ${styles.register_contain}`} onClick={e => e.stopPropagation()}>
        <h3>Crear Usuario </h3>
        <RegisterForm styles={styles} closeModal={closeModal} />

        <p> <small>Puedes registrarte con:</small> </p>

        <Buttons
          styles={styles}
          button={{ text: "Cerrar", className: styles.btn_close, handleClickModal: closeModal }}
        />
      </div>
    </dialog>
  )

}

export default Register