import fetchData from "@/utils/fetch";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { UseContext } from "../context/Context";

const PasswordInput = ({ styles }) => {
    const [visibiltyPassword, setVisibiltyPassword] = useState(false)
    const handleVisibility = () => setVisibiltyPassword(!visibiltyPassword)
    return (
        <div className={`d-flex ${styles.password_contain}`}>
            <input minLength={8} required name="password" autoComplete="off" type={visibiltyPassword ? "text" : "password"} placeholder="Contraseña" />

            {visibiltyPassword
                ? <IoMdEyeOff size="1.5em" onClick={handleVisibility} />
                : <IoMdEye size="1.5em" onClick={handleVisibility} />}

        </div>
    )
}


export const LoginForm = ({ styles }) => {
    const { login } = UseContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const url = process.env.MY_API_URL + "/api/user/login"
        // const res = await fetch(url, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
        // })

        // const res = await fetchData("user/login","POST",{ email: e.target.email.value, password: e.target.password.value })

        const res = await fetch("/api/account", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
        })
        const data = await res.json()
        console.log(data);
    }
    return (
        <form

            onSubmit={handleSubmit}
        >
            <input required type="email" name="email" placeholder="Correo electrónico" autoComplete="off" />

            <PasswordInput styles={styles} />

            <input className={styles.btn_signIn} type="submit" value={"Iniciar Sesión"} />

        </form>
    )
}

export const RegisterForm = ({ styles }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className={`d-flex ${styles.input_row}`}>
                <input required type="text" name="first_name" autoComplete="off" placeholder="Nombre" />
                <input required type="text" name="last_name" autoComplete="off" placeholder="Apellido" />
            </div>

            <input required type="email" name="email" autoComplete="off" placeholder="Correo electrónico" />

            <PasswordInput styles={styles} />
            <small style={{ textAlign: "center" }}>Clickea el ojo para verificar tu contraseña!</small>
            <input className={styles.btn_signUp} type="submit" value={"Registrarte"} />

        </form>
    )
}