import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


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

export default PasswordInput