import Image from 'next/image'
// import styles from '@/styles/Home.module.css'
// import dynamic from "next/dynamic"

// const Title = dynamic(() => import("@/components/Title"))

const filter = { filter: "drop-shadow(0 0 10px var(--primary-color))" }

export const metadata = {
  title: 'My Personal Web App',
  description: 'Aplicación web personal para guardar y organizar tus horarios, notas y tareas de forma totalmente segura.',
}

// EN PROCESO DE DISEÑO...

export default function Home() {
  return (
    <div className="d-flex f-column-center" style={{
      filter: "drop-shadow(0 0 10px var(--secondary-color))" ,
      color: "#fff", borderRadius: "36px",
      backgroundColor: "var(--background-dark)",
      width: "90%", margin: "2rem auto", padding: "1rem",
      fontSize: "1.5em", 
    }}>

      <h1 style={{ fontFamily: "__Amatic_SC_c41a4c", textAlign: "center" }}>¡Bienvenido a tu aplicación web personal!</h1>


      <div className="d-flex" style={{ flexWrap: "wrap", width: "99%", padding: "1rem", justifyContent: "space-evenly", gap: "1rem" }}>

        <Image style={filter} src={"/images/mini-brook.png"} alt="mini-brook" width={240} height={235} />

        <div className="d-flex f-column-center" style={{ color: "var(--primary-color)", justifyContent: "space-between", minHeight: "205px" }}>

          <h2 style={{ fontSize: "1.6em", textWrap: "wrap", fontFamily: "__Amatic_SC_c41a4c", }}>Qué esperas para organizar tus:</h2>

          <ul style={{ padding: ".5rem 2rem" }}>
            <li>Tareas</li>
            <li>Notas</li>
            <li>Horarios*</li>
            <li>Calendario*</li>
          </ul>
        </div>

      </div>


      <div className="d-flex" style={{
        flexWrap: "wrap", width: "99%", padding: "0 1rem",
        justifyContent: "space-evenly", gap:"2rem"
      }}>

        <div className="d-flex f-column-center" style={{gap:"2rem", alignItems: "start" }}>

          <h3 style={{ fontSize: "1.6em", fontFamily: "__Amatic_SC_c41a4c", }}>Acciones realizables:</h3>

          <ul style={{ display: "flex", maxWidth:"300px", margin:"auto", gap: "5px 5rem", flexWrap: "wrap", fontSize: "1.6em", fontFamily: "__Amatic_SC_c41a4c", paddingLeft: "2rem" }}>
            <li>Crear</li>
            <li>Leer</li>
            <li>Editar</li>
            <li>Borrar</li>
          </ul>
        </div>

        <Image style={{...filter, borderRadius:"12px", marginBottom:"2rem"}} src={"/images/poster-brook.png"} alt="poster-brook" width={228} height={338} />
      </div>





      <div className="d-flex f-column-center" style={{ textAlign: "center" }}>
        <small style={{ padding: ".5rem", fontSize: "small", color: "GrayText" }}>* Sitio en construcción *</small>


        <small style={{ padding: ".5rem", fontSize: "small", color: "GrayText" }}>Tu información estará protegida por nuestro servidor.</small>
      </div>

    </div>
  )
}
