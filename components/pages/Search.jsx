"use client"
import styles from "@/styles/components/Search.module.css"
import { useRouter } from "next/navigation"
import { useState } from "react"


const Search = ({ from, query }) => {
    const [value, setValue] = useState('')
    const [searched, setSearched] = useState(false)

    const router = useRouter()
    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault()
                if (value.trim().length >= 1) {
                    setSearched(true)
                    router.push(`?${query}=${value.trim()}`)
                }
            }}
        >
            <input
                className={styles.inputText}
                type="text"
                placeholder={`Buscar ${from}...`}
                autoComplete="off"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                minLength={1}
                disabled={searched}
            />

            <input
                type={searched ? "button" : "submit"}
                value={searched ? "Borrar ✖" : "Buscar"}
                className={`${styles.input} ${searched ? styles.delete : styles.search}`}
                onClick={(e) => {
                    if (searched) {
                        e.preventDefault()
                        setValue('')
                        setSearched(false)
                        router.push(`?`)
                    }
                }}
            />

        </form>
    )
}

export default Search