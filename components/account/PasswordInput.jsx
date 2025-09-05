import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


const PasswordInput = ({ styles, value, onChange }) => {
  const [visibiltyPassword, setVisibiltyPassword] = useState(false)
  const handleVisibility = () => setVisibiltyPassword(!visibiltyPassword)
  return (
    <div className={`d-flex ${styles.password_contain}`}>
      <input name="password" autoComplete="off" type={visibiltyPassword ? "text" : "password"} placeholder="Contraseña" value={value} onChange={onChange} />

      {visibiltyPassword
        ? <IoMdEyeOff size="1.5em" onClick={handleVisibility} />
        : <IoMdEye size="1.5em" onClick={handleVisibility} />}

    </div>
  )
}

export default PasswordInput