import dynamic from "next/dynamic"
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import NotFound from "@/app/not-found";

const Title = dynamic(() => import("@/components/Title"), { ssr: false })


export const metadata = {
  "title": "Horarios",
  description: "En esta sección podrás crear, editar y guardar tus horarios de manera personalizada!"
}

const aditional = [
  {
    name: <><FaDesktop />Escritorio</>,
    path: "/horarios/escritorio"
  },
  {
    name: <><FaMobileAlt /> Celular</>,
    path: "/horarios/celular"
  }
]
const Page = ({ params }) => {
  const { view } = params

  if (view != "escritorio" && view != "celular") return (
    <NotFound message={"En horarios, no existe la siguiente sección: /" + view} />
  )
  return (<>
    <Title title={"Mis Horarios"} linkContent={aditional} />


  </>)
}

export default Page
