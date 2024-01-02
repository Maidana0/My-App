'use client'
import Header from '../Header'
import ListToDo from './ListToDo'
import { BsClipboard2Fill, BsClipboardCheckFill } from "react-icons/bs";
import { UseContext } from '../Context';

const ObjetivosPage = ({ styles }) => {
    const { router, searchParams } = UseContext()
    const taskList = searchParams.has("completed")
    const handleClick = () => router.replace(`/objetivos?${taskList ? "list-to-do" : "completed"}`)

    return (
        <>
            <Header title={`Mis Objetivos`}>
                <button className={`icon-bg-${taskList ? 'b' : 'w'} btn-icon`}
                    onClick={handleClick}>
                    {
                        taskList
                            ? <BsClipboard2Fill title='Por Cumplir' />
                            : <BsClipboardCheckFill title='Cumplidos' />
                    }
                </button>


            </Header>

            <ListToDo styles={styles} />
        </>
    )
}

export default ObjetivosPage