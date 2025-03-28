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
        let value = e.target.value
        if (value == currentValue) return;
        value = `?${name}=${value}`

        if (searchParams.size == 0 || searchParams.size == 1 && searchParams.has(name))
            return router.push(value)

        if (!searchParams.has(name))
            return router.push(value + "&" + searchParams.toString())
        
        // HAY ALGO QUE NO FUNCIONA AL INTENTAR PONER DOS O MÁS PARAMETROS, 
        // EJ EN LA BUSQUEDA SE BORRA EL TASK Y SOLO QUEDA EL =BUSCADA

        // Si ya existe el parametro, cambiar su valor manteniendo los demas intactos

        let prevParams = searchParams.toString().split("=") // Separar los parametros
        let indexOfCurrentParam = prevParams.findIndex(
            (param) => param.includes(name) // Encontrar el indice del parametro actual
        )
        prevParams[indexOfCurrentParam + 1] = value.split("=")[1] // Cambiar su valor
        prevParams = prevParams.join("=") // Unir los parametros nuevamente
        router.push("?" + prevParams)
    }

    return (
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
    )
}