import Link from "next/link";
import HeaderComponent from "../Header"
import { BsClipboard2Fill, BsClipboardCheckFill } from "react-icons/bs";


const Header = ({ list }) => {
    let bool = list == "realizadas"
    return (

        <HeaderComponent
            title={`Mis Tareas ${list.split("-").join(" ")}`}
        >
            <Link
                className={`icon-bg-${bool ? 'b' : 'w'} btn-icon`}
                href={`/tareas/${bool ? "por-hacer" : "realizadas"}`}
            >
                {
                    bool
                        ? <BsClipboard2Fill title='Tareas por hacer' />
                        : <BsClipboardCheckFill title='Tareas Realizadas' />
                }
            </Link>

        </HeaderComponent>
    )


}

export default Header
