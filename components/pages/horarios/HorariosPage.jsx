'use client'
import Table from "./Table"
import ResponsiveTable from "./ResponsiveTable"
import Header from "../Header"
import { FaDesktop, FaMobileAlt } from "react-icons/fa";

import { useRouter, useSearchParams } from "next/navigation";

const HorariosPage = (props) => {
    const { font, styles, days, hours } = props
    const router = useRouter()
    const view = useSearchParams().get("view")
    const mode = view == "mobile"

    const handleClick = () => router.replace(`/horarios?view=${mode ? "desktop" : "mobile"}`)

    return (
        <>
            <Header title={'Mis Horarios'}>
                <button className={`icon-bg-${mode ? 'b' : 'w'} btn-icon`}
                    onClick={handleClick}>
                    {mode ?
                        <FaDesktop title="Vista Escritorio" /> : <FaMobileAlt title="Vista Celular" />}
                </button>
            </Header>
            {mode ?
                <ResponsiveTable font={font} styles={styles} days={days} hours={hours} />
                :
                <Table font={font} styles={styles} days={days} hours={hours} />
            }

        </>
    )
}

export default HorariosPage