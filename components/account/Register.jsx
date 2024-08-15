"use client"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const RegisterForm = dynamic(() => import("./RegisterForm"), { ssr: false, loading: () => <p>...</p> })
const Buttons = dynamic(() => import("./Buttons"), { ssr: false })

const Register = ({ styles }) => {

  const queryParam = useSearchParams().has("registrarme")

  const router = useRouter()
  const closeModal = () => router.push("?")


  if (!queryParam) return
  else return (
    <div className={`d-flex ${styles.register_modal}`}>
      <div className={`d-flex f-column-center ${styles.register_contain}`}>
        <h3>Crear Usuario </h3>
        <RegisterForm styles={styles} closeModal={closeModal} />

        <p><small>Puedes registrarte con: </small></p>
        <Buttons
          styles={styles}
          button={{ text: "Cerrar", className: styles.btn_close, handleClickModal: closeModal }}
        />
      </div>
    </div>
  )

}

export default Register