"use client"
import Buttons from "./Buttons"
import { LoginForm } from "./Forms"
import { useRouter } from "next/navigation"


const Login = ({ styles }) => {
  const router = useRouter()
  const openModal = () => router.push("?registrarme")

  return (
    <div className={`d-flex ${styles.login_contain}`}>

      <LoginForm styles={styles} />


      <Buttons styles={styles} button={{
        handleClickModal: openModal, text: "Crear cuenta nueva", className: styles.btn_signUp
      }} />

    </div>
  )
}

export default Login