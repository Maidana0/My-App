'use client'
import { useState } from "react"
import Table from "./Table"
import ResponsiveTable from "./ResponsiveTable"
import Header from "../Header"
import { FaDesktop, FaMobileAlt   } from "react-icons/fa";


const HorariosPage = (props) => {
    const [mode, setMode] = useState(false)
    const handleClick = () => setMode(!mode)
    const { font, styles, days, hours } = props

    return (
        <>
            <Header title={'Mis Horarios'}>
                <button className={`icon-bg-${mode ? 'b' : 'w'} btn-icon`}
                    onClick={handleClick}>
                    {mode ? 
                    <FaDesktop title="Vista Escritorio"/> : <FaMobileAlt title="Vista Celular"/>}
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