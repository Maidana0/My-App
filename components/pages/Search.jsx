"use client"
import styles from "@/styles/components/Search.module.css"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


const Search = ({ from, query }) => {
    const queryParam = useSearchParams().get(query)
    const [value, setValue] = useState(queryParam)

    const router = useRouter()

    return (
        <form
            className={`d-flex ${styles.form}`}
            onSubmit={(e) => {
                e.preventDefault()
                if (value) {
                    value.trim().length >= 1 && router.push(`?${query}=${value.trim()}`)
                }
            }}
        >
            <input
                className={styles.inputText}
                type="text"
                placeholder={`Buscar ${from}...`}
                autoComplete="off"
                value={value ? value : ''}
                onChange={(e) => setValue(e.target.value)}
                minLength={1}
                disabled={queryParam}
            />

            <input
                type={queryParam ? "button" : "submit"}
                value={queryParam ? "Borrar ✖" : "Buscar"}
                className={`${styles.input} ${queryParam ? styles.delete : ''}`}
                onClick={(e) => {
                    if (queryParam) {
                        e.preventDefault()
                        setValue('')
                        router.push(`?`)
                    }
                }}
            />

        </form>
    )
}

export default Search