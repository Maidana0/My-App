import Image from 'next/image'
import styles from '@/styles/Auth.module.css'
import dynamic from 'next/dynamic'

export const metadata = {
  "title": "Iniciar Sesión",
  description: "Ingresa sesión con tu correo electronico y contraseña asignada en el registro!"
}

const Login = dynamic(() => import("@/components/account/Login"), { ssr: false })
const Register = dynamic(() => import("@/components/account/Register"), { ssr: false })

export default function Auth({searchParams }) {
  const fail = searchParams?.failValidation || false

  return (
    <div className={`d-flex ${styles.auth_contain}`}>
      <div className={`d-flex ${styles.auth_header}`}>
        <Image priority
          src={'/images/icon.webp'} alt='Luffy Icon'
          width={100} height={100} />
        <h1>My Personal App</h1>
        {fail ? <span style={{maxWidth:"300px", fontSize:"1.3em", marginTop:"1rem"}}>{fail}</span> : ""}
      </div>


      <Login styles={styles} />
      {/* El login tiene un boton para abrir el modal de register */}
      <Register styles={styles} />


    </div>
  )
}
