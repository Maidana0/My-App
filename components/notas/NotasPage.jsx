"use client"
import Header from '../Header'
import Note from './Note';
import NewNote from './newNote';
import { CgMathPlus } from "react-icons/cg"
import { useState } from 'react';
import { UseContext } from '../Context';

const NotasPage = ({ styles }) => {
    const { router } = UseContext()

    const [listNotes, setListNotes] = useState([])

    return (
        <>
            <Header title='Mis Notas' />

            <section className={styles.notes_contain}>

                {
                    listNotes.map((item, i) =>
                        <Note key={i}
                            date={item.date}
                            text={item.text}
                            styles={styles}
                        />
                    )
                }

                <NewNote
                    styles={styles}
                    list={listNotes}
                    setList={setListNotes}
                />
            </section>


            {listNotes.length > 6 &&
                <CgMathPlus
                    onClick={() => router.replace("#new")}
                    className={`${styles.btn_add}`}
                />}
        </>
    )
}


export default NotasPage 