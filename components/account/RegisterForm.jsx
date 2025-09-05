import { useEffect, useState, useTransition } from "react"
import { UseContext } from "../context/Context"
import fetchData from "@/utils/fetch"
import PasswordInput from "./PasswordInput"
import Spinner from "../shared/Spinner"

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
  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  })
  const [isPending, startTransition] = useTransition()

  const validateFields = () => {
    let errors = {}

    // Validación de nombre
    if (!fields.first_name.trim()) {
      errors.first_name = "El nombre es obligatorio."
    } else if (fields.first_name.trim().length < 2) {
      errors.first_name = "El nombre debe tener al menos 2 caracteres."
    }

    // Validación de apellido
    if (!fields.last_name.trim()) {
      errors.last_name = "El apellido es obligatorio."
    } else if (fields.last_name.trim().length < 2) {
      errors.last_name = "El apellido debe tener al menos 2 caracteres."
    }

    // Validación de email
    if (!fields.email.trim()) {
      errors.email = "El correo electrónico es obligatorio."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      errors.email = "El correo electrónico no es válido."
    }

    // Validación de contraseña
    if (!fields.password) {
      errors.password = "La contraseña es obligatoria."
    } else if (fields.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres."
    }

    setErrorField(errors)
    return Object.keys(errors).length === 0
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateFields()) return

    const newUser = {
      first_name: fields.first_name.trim(),
      last_name: fields.last_name.trim(),
      email: fields.email.trim(),
      password: fields.password
    }

    startTransition(async () => {
      const data = await fetchData("account/user", {
        isLocalReq: true,
        method: "POST",
        body: newUser
      })

      if (data?.success) {
        handleMessage(data)
        closeModal()
        return
      } else if (data.error == "Bad Request") {
        let serverErrors = {}
        data.message.forEach(field => {
          const objectMsg = handleErrorField(field)
          serverErrors = { ...serverErrors, ...objectMsg }
        })
        setErrorField(serverErrors)
      } else {
        handleMessage({
          success: false,
          message: "Ocurrió un error, inténtelo más tarde."
        })
      }
    })
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFields({ ...fields, [name]: value })
    // Limpiar errores solo si hay errores activos
    if (Object.keys(errorField).length > 0) {
      setErrorField({})
    }
  }


  useEffect(() => {
    setErrorField({})
  }, [])

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <div className={`d-flex ${styles.input_row}`}>
          <input
            type="text"
            name="first_name"
            autoComplete="off"
            placeholder="Nombre"
            value={fields.first_name}
            onChange={handleOnChange}
          />

          <input
            type="text"
            name="last_name"
            autoComplete="off"
            placeholder="Apellido"
            value={fields.last_name}
            onChange={handleOnChange}
          />
        </div>
        {
          (errorField.first_name || errorField.last_name) ?
            <div className={`d-flex`} style={{ justifyContent: "space-between" }}>
              <div className="error-fields" style={{ width: "50%" }}>
                <p>
                  {errorField.first_name}
                </p>
              </div>
              <div className="error-fields" style={{ width: "50%" }}>
                <p>
                  {errorField.last_name}
                </p>
              </div>
            </div>
            : ""
        }
      </div>

      <div>
        <input
          type="text"
          name="email"
          autoComplete="off"
          placeholder="Correo electrónico"
          value={fields.email}
          onChange={handleOnChange}
          style={{ width: "100%" }}
        />
        {errorField.email ? <div className="error-fields" ><p>{errorField.email}</p></div> : ""}
      </div>

      <div>
        <PasswordInput
          styles={styles}
          value={fields.password}
          onChange={handleOnChange}
        />
        {errorField.password ? <div className="error-fields" ><p>{errorField.password}</p></div> : ""}
      </div>

      <p style={{ textAlign: "center" }}><small>Clickea el ojo para verificar tu contraseña!</small></p>

      <button
        className={`${styles.btn_signUp} d-flex f-center`}
        style={{ gap: "8px" }}
        type="submit"
        disabled={isPending}
      >
        {isPending ? <>
          <Spinner />
          Registrando...
        </> : "Registrarme"}
      </button>

    </form>
  )
}

export default RegisterForm