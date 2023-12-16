'use client'
import { useState } from "react"
import Table from "./Table"
import ResponsiveTable from "./ResponsiveTable"
import Title from "../Title"

const State = (props) => {
    const [mode, setMode] = useState(false)
    const handleClick = () => setMode(!mode)
    const { font, styles, days, hours } = props

    return (
        <div>
            <div className={`d-flex ${styles.header}`}>
                <Title title={'Mis Horarios'} />
                <button className={`bg-${mode ? 'd' : 'w'} btn ${1}`}
                    onClick={handleClick}>
                    {mode ? 'Desktop' : 'Mobile'}
                </button>
            </div>
            {mode ?
                <ResponsiveTable font={font} styles={styles} days={days} hours={hours} />
                :
                <Table font={font} styles={styles} days={days} hours={hours} />
            }

        </div>
    )
}

export default State