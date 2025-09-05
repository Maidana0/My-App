"use client"
import LoginForm from "./LoginForm";
import Buttons from "./Buttons";
import { UseAuthModalContext } from "../context/AuthModal";

const Login = ({ styles }) => {
  const { openModal } = UseAuthModalContext()

  return (
    <div className={`d-flex ${styles.login_contain}`}>
      <LoginForm styles={styles} />

      <Buttons styles={styles} button={{
        text: "Crear cuenta nueva",
        className: styles.btn_signUp,
        handleClickModal: openModal
      }} />
    </div>
  )
}

export default Login