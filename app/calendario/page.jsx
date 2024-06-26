import Image from "next/image"

export const metadata = {
  "title": "Calendario",
  description: "Maneja tu agenda personal con tus eventos y rutinas, guardados en un calendario personal para ti!"
}

const Page = () => {
  return (
    <div style={{
      textAlign: "center", color: "#fff", height: "80vh",
      backgroundColor: "var(--background-dark)", padding:"4rem 2rem 0"
    }}>

        <h1 style={{ textWrap: "wrap", padding: "2rem" }}>
          Este sitio se encuentra en construcción...
        </h1>

        <Image
          priority={false}
          src={"/images/loads/2.gif"}
          width={250}
          height={250}
          alt="cartman-gif"
        />
    </div>
  )
}

export default Page
