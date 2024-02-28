import NotesPage from "@/components/pages/notes/NotesPage"
// import styles from "@/styles/Notes.module.css"
import React from "react"
import Loading from "../loading"
import { Suspense } from "react"
import Header from "@/components/pages/Title"
import Search from "@/components/pages/Search"

export const metadata = {
    title: "Notas"
}


export default function Notas() {
    return (
        <>
            <NotesPage />
            <Header title={"Mis Notas"} />
            <Search from={"nota"} query={"text"} />
        </>
    )
}

