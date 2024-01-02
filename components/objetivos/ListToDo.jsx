"use client"
import { MdDeleteForever, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useState, useEffect } from "react"
import { List } from "./List";

const ListToDo = ({ styles }) => {
    const [list, setList] = useState([{ title: 'hola', sucess: false }])

    useEffect(() => {
        const element = document.getElementById("list")
        element.scrollTo(0, 50000)
    }, [list])

    return (
        <List styles={styles} form={true}
            list={list} setList={setList}
        >

            {list.map((tasks, i) =>
                <div key={i} className={styles.task_container}
                    title={tasks.date}>

                    <p className={styles.task_text}>
                        {tasks.title}
                    </p>

                    <div className={styles.task_btn_container}>

                        <MdOutlineCheckBoxOutlineBlank
                            fontSize={'1.7em'} title="Realizada"
                            className={`${styles.btn_check}`}
                        />

                        <MdDeleteForever fontSize={'1.7em'} title="Borrar"
                            className={`${styles.btn_delete}`}
                        />
                    </div>
                </div>
            )}


        </List>
    )
}


export default ListToDo