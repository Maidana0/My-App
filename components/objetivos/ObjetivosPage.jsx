'use client'
import { useState } from 'react'
import Header from '../Header'
import ListToTasks from './ListToTasks'
import { BsClipboard2Fill, BsClipboardCheckFill } from "react-icons/bs";

const ObjetivosPage = ({ styles }) => {
    const [tasks, setTasks] = useState(false)
    const handleClick = () => setTasks(!tasks)
    return (
        <>
            <Header title={`Mis Objetivos`}>
                <button className={`icon-bg-${tasks ? 'b' : 'w'} btn-icon`}
                    onClick={handleClick}>
                    {
                        tasks
                            ? <BsClipboard2Fill title='Por Cumplir' />
                            : <BsClipboardCheckFill title='Cumplidos' />
                    }
                </button>


            </Header>

            <ListToTasks styles={styles} />
        </>
    )
}

export default ObjetivosPage