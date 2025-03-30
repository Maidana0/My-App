"use client"
import styles from "@/styles/components/Search.module.css"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


const Search = ({ from, query }) => {
    const searchParams = useSearchParams()
    const currentValue = searchParams.toString()
    const currentQueryValue = searchParams.get(query)

    const [value, setValue] = useState(currentQueryValue)

    const router = useRouter()

    return (
        <form
            className={`d-flex ${styles.form}`}
            onSubmit={(e) => {
                e.preventDefault()
                if (value.trim().length < 1) { return }
                if (searchParams.has(query)) {
                    router.push(`?${currentValue.replace(currentQueryValue, value.trim())}`)
                    return
                } else if (searchParams.size > 0) {
                    router.push(`?${currentValue}&${query}=${value.trim()}`)
                    return
                }

                router.push(`?${query}=${value.trim()}`)
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
                disabled={currentQueryValue}
            />

            <input
                type={currentQueryValue ? "button" : "submit"}
                value={currentQueryValue ? "✖" : "Buscar"}
                className={`${styles.input} ${currentQueryValue ? styles.delete : ''}`}
                onClick={(e) => {
                    if (currentQueryValue) {
                        e.preventDefault()
                        setValue('')
                        router.push(`?${currentValue.replace(`${query}=${currentQueryValue}`, '')}`)
                    }
                }}
            />

        </form>
    )
}

export default Search