import dynamic from "next/dynamic"
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import NotFound from "@/app/not-found";

const Title = dynamic(() => import("@/components/Title"), { ssr: false })
const StaticTable = dynamic(() => import("@/components/schedules/StaticTable"), { ssr: false })


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


const days = ['Lunes', 'Martes', 'Miér', 'Jueves', 'Viernes', 'Sábado'
];

const hours = [
  '08:00 a 12:00', '12:00 a 14:00', '14:00 a 18:00', '19:00 a 23:00',
];

const Page = ({ params }) => {
  const { view } = params

  if (view != "escritorio" && view != "celular") return (
    <NotFound message={"En horarios, no existe la siguiente sección: /" + view} />
  )
  return (<>
    <Title title={"Mis Horarios"} linkContent={aditional} />
    <StaticTable view={view} days={days} hours={hours} />
  </>)
}

export default Page
