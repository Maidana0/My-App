"use client"

import fetchData from "@/utils/fetch"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"


const CategoryFilter = () => {
    const useSearch = useSearchParams()
    const alreadySelectedCategory = useSearch.get("category") || ""
    const router = useRouter()
    const [listCategories, setListCategories] = useState([])

    useEffect(() => {
        fetchData("tasks/filter/categories", { isLocalReq: true })
            .then(data => setListCategories(data))
    }, [])

    return (
        <select
            value={alreadySelectedCategory}
            onChange={(e) => {
                let value = `?category=${e.target.value}`
                if (useSearch.has("task")) {
                    value = `?task=${useSearch.get("task")}${value.replace("?", "&")}`
                }
                router.push(value)
            }}
        >
            <option value="" disabled>Filtrar por Categoría:</option>
            <option value="">TODAS</option>

            {listCategories.length > 0
                ?
                listCategories.map((category, i) => (
                    <option key={i} value={category}>{category.toUpperCase()}</option>
                ))
                :
                <option value="" disabled>Cargando...</option>
            }
        </select>
    )
}

export default CategoryFilter