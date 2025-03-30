"use client"

import fetchData from "@/utils/fetch"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "@/styles/components/Filters.module.css"

export default function SortBy({ name, defaultOption, staticOptions }) {

    const [options, setOptions] = useState(staticOptions || [])

    useEffect(() => {
        if (name != "category") return; // Lo siguiente es solo para las tareas
        fetchData("tasks/filter/categories", { isLocalReq: true })
            .then(categories => setOptions(["todas", ...categories]))
    }, [])

    const searchParams = useSearchParams()
    const router = useRouter()
    const currentValue = searchParams.get(name)

    const handleChange = (e) => {
        const currentParams = searchParams.toString()

        const value = e.target.value
        if (value == currentValue) return;

        if (searchParams.has(name)) {
            router.push(`?${currentParams.replace(currentValue, value)}`)
            return
        } else if (searchParams.size > 0) {
            router.push(`?${currentValue}&${name}=${value}`)
            return
        }
        router.push(`?${name}=${value}`)
    }

    return (
        <div className={styles.container}>
            <select name={name} className={styles.custom_select} id={name} value={currentValue ?? "0"} onChange={handleChange}>
                <option value="0" disabled>{defaultOption}</option>
                {options.length > 0
                    ?
                    options.map((option, i) => (
                        <option key={i} value={option.value ?? option}>{option.label ?? option}</option>
                    ))
                    :
                    <option value="" disabled>Cargando...</option>
                }
            </select>
        </div>
    )
}