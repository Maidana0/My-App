"use client"
import { IoSendSharp } from "react-icons/io5";
import { time } from "../utils";
import { useState } from "react";

export const List = ({ styles, children, form, list, setList }) => {
    const [task, setTask] = useState({ title: '', sucess: false, date: time().full_date })

    return (
        <div className={`bg-d ${styles.tasks_list_container}`}>
            <div id="list" className={styles.list_container}>
                {/* TASK CONTAINER DIV */}
                {children}
            </div>



            {form &&
                <form className={styles.form_send}
                    onSubmit={(e) => {
                        e.preventDefault();
                        setList([...list, task]);
                        setTask({ title: '', sucess: false, date: time().full_date })
                    }}>
                    <input type="text" placeholder="Escribir nuevo objetivo..." name="title"
                        value={task.title} required
                        onChange={async (e) => setTask({
                            ...task, [e.target.name]: e.target.value,
                        })}
                    />

                    <button type="submit" >
                        <IoSendSharp />
                    </button>
                </form>
            }

        </div>
    )
}

