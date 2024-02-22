"user client"
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PasswordInput = ({styles}) => {
    const [visibiltyPassword, setVisibiltyPassword] = useState(false)
    const handleVisibility = () => setVisibiltyPassword(!visibiltyPassword)
    return (
        <div className={`d-flex ${styles.password_contain}`}>
            <input name="password"  autoComplete="off" type={visibiltyPassword ? "text" : "password"} placeholder="Contraseña" />

            {visibiltyPassword
                ? <IoMdEyeOff size="1.5em" onClick={handleVisibility} />
                : <IoMdEye size="1.5em" onClick={handleVisibility} />}

        </div>
    )
}


export const LoginForm = ({ styles }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit} >
            <input type="email" name="email" placeholder="Correo electrónico" autoComplete="off" />

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
                <input type="text" name="first_name" autoComplete="off" placeholder="Nombre" />
                <input type="text" name="last_name" autoComplete="off" placeholder="Apellido" />
            </div>

            <input type="email" name="email" autoComplete="off" placeholder="Correo electrónico" />

            <PasswordInput  styles={styles}/>

            <input className={styles.btn_signUp} type="submit" value={"Registrarte"} />

        </form>
    )
}