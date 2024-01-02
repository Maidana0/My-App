"use client"

import { createContext, useContext } from 'react'
import { useRouter, useSearchParams } from "next/navigation"


export const Context = createContext({})

export default function ContextProvider({ children }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    return <Context.Provider value={{
        router,
        searchParams
    }}>
        {children}
    </Context.Provider>
}

export const UseContext = () => useContext(Context)