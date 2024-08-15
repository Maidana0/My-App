import dynamic from "next/dynamic"
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import NotFound from "@/app/not-found";

const Title = dynamic(() => import("@/components/Title"), { ssr: false })
const Table = dynamic(() => import("@/components/schedules/Table"), { ssr: false })
const ResponsiveTable = dynamic(() => import("@/components/schedules/ResponsiveTable"), { ssr: false })


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


const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

const hours = [
  '08:00 a 12:00', '12:00 a 14:00', '14:00 a 16:00',
  '16:00 a 18:00', '19:00 a 23:00',
];

const Page = ({ params }) => {
  const { view } = params

  if (view != "escritorio" && view != "celular") return (
    <NotFound message={"En horarios, no existe la siguiente sección: /" + view} />
  )
  return (<>
    <Title title={"Mis Horarios"} linkContent={aditional} />
    {view == "escritorio"
      ? <Table days={days} hours={hours} />
      : <ResponsiveTable days={days} hours={hours} />
    }
  </>)
}

export default Page
