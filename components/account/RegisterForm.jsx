import { useState } from "react"
import { UseContext } from "../context/Context"
import fetchData from "@/utils/fetch"
import PasswordInput from "./PasswordInput"

const handleErrorField = (fieldMessage) => {
    let splitMessage = fieldMessage.split(" ")
    let message = splitMessage.slice(1).join(" ")
    let object = {}
    object[splitMessage[0]] = message
    return object
}

const RegisterForm = ({ closeModal, styles }) => {
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

export default RegisterForm