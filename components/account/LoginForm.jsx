import fetchData from "@/utils/fetch";
import { useEffect, useState, useTransition } from "react";
import { UseContext } from "../context/Context"
import PasswordInput from "./PasswordInput";
import { useRouter } from "next/navigation";
import Spinner from "../shared/Spinner";


const LoginForm = ({ styles }) => {
  const [errorField, setErrorField] = useState([])
  const [fields, setFields] = useState({ email: "", password: "" })
  const [isPending, startTransition] = useTransition()
  const { login, handleMessage } = UseContext()
  const router = useRouter()

  const validateFields = () => {
    let errors = []

    if (!fields.email.trim()) {
      errors.push("El correo electrónico es obligatorio.")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      errors.push("El correo electrónico no es válido.")
    }

    if (!fields.password) {
      errors.push("La contraseña es obligatoria.")
    }

    setErrorField(errors)
    return errors.length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateFields()) return;

    startTransition(async () => {
      const data = await fetchData("account",
        {
          isLocalReq: true, method: "POST",
          body: fields
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
    })
  }

  useEffect(() => {
    setErrorField([])
  }, [])

  const handleOnChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
    if (errorField.length > 0) {
      setErrorField([])
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <input type="text" name="email" placeholder="Correo electrónico" autoComplete="off" value={fields.email} onChange={handleOnChange} />

      <PasswordInput styles={styles} value={fields.password} onChange={handleOnChange} />

      <ul className="error-fields">
        {errorField.map((msg, i) => <li key={i}>{msg}</li>)}
      </ul>

      <button
        className={`${styles.btn_signIn} d-flex f-center`}
        style={{ gap: "8px" }}
        type="submit"
        disabled={isPending}
      >
        {isPending ? <>
          <Spinner />
          Iniciando...
        </> : "Iniciar sesión"}
      </button>

    </form >
  )
}

export default LoginForm