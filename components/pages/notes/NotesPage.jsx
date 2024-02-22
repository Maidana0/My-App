"use client"
import Note from './Note';
import NewNote from './NewNote';
import { CgMathPlus } from "react-icons/cg"
import { useEffect, useState } from 'react';
import fetchData from '@/utils/fetch';
import NotFound from '@/app/not-found';
import styles from "@/styles/Notes.module.css"
import React from 'react';
import LocalLoading from '@/components/loads/LocalLoading';
import { useRouter } from 'next/navigation';




const NotesPage = () => {
    const [loading, setLoading] = useState(true)
    const [listNotes, setListNotes] = useState([])
    const [searchNote, setSearchNote] = useState('')
    const router = useRouter()
    useEffect(() => {
        setLoading(true)
        fetchData(`notes?text=${searchNote}`)
            .then(data => setListNotes(data), setLoading(false))
    }, [searchNote])
    return (

        listNotes.statusCode > 200 ?
            <NotFound error={listNotes} />
            :
            <>
                {
                    loading ?
                        <Load image={4} />
                        :
                        <section id="nota" className={`${styles.notes_contain} ${listNotes.length < 3 ? styles.column_3 : ''}`}>
                            {listNotes.map(
                                (item, i) =>
                                    <Note key={i}
                                        date={item.date}
                                        text={item.text}
                                        styles={styles}
                                        setListNotes={setListNotes}
                                    />
                            )}
                            <NewNote
                                styles={styles}
                                setListNotes={setListNotes}
                            />
                        </section>
                }


                {
                    listNotes.length > 6 &&
                    <CgMathPlus
                        onClick={() => router.replace("#new")}
                        className={styles.btn_add}
                    />
                }
            </>
    )
}

export default NotesPage 