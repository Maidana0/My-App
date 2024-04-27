import Image from "next/image"


export const metadata = {
  "title": "Horarios",
  description: "En esta sección podrás crear, editar y guardar tus horarios de manera personalizada!"
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