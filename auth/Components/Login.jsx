"use client"
import { useState } from "react"
import Buttons from "./Buttons"
import Register from "./Register"
import { LoginForm } from "./Forms"


const Login = ({ styles }) => {
  const [modalRegister, setModalRegister] = useState(false)
  const handleClickModal = () => setModalRegister(!modalRegister)


  return (
    <>
      <div className={`d-flex ${styles.login_contain}`}>

        <LoginForm styles={styles} />


        <Buttons styles={styles} button={{
          handleClickModal, text: "Crear cuenta nueva", className: styles.btn_signUp
        }} />


      </div>
      {
        modalRegister ?
          <Register styles={styles} handleClickModal={handleClickModal} />
          : ""
      }
    </>
  )
}

export default Login