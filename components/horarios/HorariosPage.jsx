'use client'
import { useState } from "react"
import Table from "./Table"
import ResponsiveTable from "./ResponsiveTable"
import Header from "../Header"

const HorariosPage = (props) => {
    const [mode, setMode] = useState(false)
    const handleClick = () => setMode(!mode)
    const { font, styles, days, hours } = props

    return (
        <>
            <Header title={'Mis Horarios'}>
                <button className={`bg-${mode ? 'd' : 'w'} btn ${1}`}
                    onClick={handleClick}>
                    {mode ? 'Desktop' : 'Mobile'}
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