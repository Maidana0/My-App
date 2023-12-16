'use client'
import { useState } from 'react'
import Header from '../Header'

const AgendaPage = ({ styles }) => {
    const [tasks, setTasks] = useState(false)
    const handleClick = () => setTasks(!tasks)
    return (
        <>
            <Header title='Mi Agenda'>
                <button className={`bg-${tasks ? 'd' : 'w'} btn ${1}`}
                    onClick={handleClick}>
                    {tasks ? 'Tareas' : 'Objetivos'}
                </button>
            </Header>
        </>
    )
}

export default AgendaPage