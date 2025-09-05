"use client"
import { createContext, useContext, useState } from "react"

const Context = createContext()

export const AuthModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const togleModal = () => setIsOpen(prev => !prev)


  return <Context.Provider value={{
    isOpen,
    openModal,
    closeModal,
    togleModal,
  }}>
    {children}
  </Context.Provider>
}


export const UseAuthModalContext = () => useContext(Context)