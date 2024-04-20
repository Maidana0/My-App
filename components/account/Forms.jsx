import fetchData from "@/utils/fetch";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { UseContext } from "../context/Context"



const handleErrorField = (fieldMessage) => {
    let splitMessage = fieldMessage.split(" ")
    let message = splitMessage.slice(1).join(" ")
    let object = {}
    object[splitMessage[0]] = message
    return object
}


const PasswordInput = ({ styles }) => {
    const [visibiltyPassword, setVisibiltyPassword] = useState(false)
    const handleVisibility = () => setVisibiltyPassword(!visibiltyPassword)
    return (
        <div className={`d-flex ${styles.password_contain}`}>
            <input minLength={8} name="password" autoComplete="off" type={visibiltyPassword ? "text" : "password"} placeholder="Contraseña" />

            {visibiltyPassword
                ? <IoMdEyeOff size="1.5em" onClick={handleVisibility} />
                : <IoMdEye size="1.5em" onClick={handleVisibility} />}

        </div>
    )
}


export const LoginForm = ({ router, styles }) => {
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
            router.refresh()
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

export const RegisterForm = ({ closeModal, styles }) => {
    const { handleMessage } = UseContext()
    const [errorField, setErrorField] = useState({})



    const handleSubmit = async (e) => {
        e.preventDefault()
        const newUser = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value, password: e.target.password.value
        }
        const data = await fetchData("account/user", { isLocalReq: true, method: "POST", body: newUser })

        if (data?.success) {
            handleMessage(data)
            closeModal()
            return
        } else if (data.error == "Bad Request") {
            let mesagges = {}
            data.message.map(field => {
                const objectMsg = handleErrorField(field)
                mesagges = { ...mesagges, ...objectMsg }
                setErrorField(mesagges)
            })
        }

    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={`d-flex ${styles.input_row}`}>
                <input type="text" name="first_name" autoComplete="off" placeholder="Nombre" />
                <input type="text" name="last_name" autoComplete="off" placeholder="Apellido" />
            </div>
            {
                (errorField.first_name || errorField.last_name) ?
                    <div className={`d-flex ${styles.input_row}`}>
                        <span>
                            {errorField.first_name}
                        </span>

                        <span>
                            {errorField.last_name}
                        </span>
                    </div>
                    : ""
            }


            <input type="email" name="email" autoComplete="off" placeholder="Correo electrónico" />
            {errorField.email ? <span>{errorField.email}</span> : ""}
            <PasswordInput styles={styles} />
            {errorField.password ? <span>{errorField.password}</span> : ""}

            <small style={{ textAlign: "center" }}>Clickea el ojo para verificar tu contraseña!</small>
            <input className={styles.btn_signUp} type="submit" value={"Registrarte"} />

        </form>
    )
}