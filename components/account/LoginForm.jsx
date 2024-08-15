import fetchData from "@/utils/fetch";
import { useState } from "react";
import { UseContext } from "../context/Context"
import PasswordInput from "./PasswordInput";


const LoginForm = ({ router, styles }) => {
    const [errorField, setErrorField] = useState([])
    const { login, handleMessage } = UseContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await fetchData("account",
            {
                isLocalReq: true, method: "POST",
                body: { email: e.target.email.value, password: e.target.password.value }
            })

        if (data.token) {
            login()
            router.push("/")
            return
        }
        if (data.error == "Bad Request") {
            setErrorField(data.message)
            return
        } else if (data.error == "Unauthorized") {
            setErrorField([data.message])
            return
        }

        handleMessage({ success: false, message: "Ocurrio un error, intentelo mas tarde." })
    }
    return (
        <form onSubmit={handleSubmit} >
            <input type="email" name="email" placeholder="Correo electrónico" autoComplete="off" />

            <PasswordInput styles={styles} />

            {errorField.map((msg, i) => <span key={i}>- {msg}</span>)}

            <input className={styles.btn_signIn} type="submit" value={"Iniciar Sesión"} />

        </form >
    )
}

export default LoginForm