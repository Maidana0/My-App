"use client"
import { createContext, useContext, useState } from "react";
import styles from "@/styles/components/Message.module.css"

const Context = createContext()

export const ContextProvider = ({ children }) => {
    const [message, setMessage] = useState(false)

    const handleMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(false);
        }, 3500);
    }



    return <Context.Provider value={{
        handleMessage,

    }}>
        {children}


        {

            <div className={`${styles.message_contain}`}>

                {
                    message
                        ?
                        <div >
                            <div className={`${message ? message.success ? styles.success : styles.fail : ""}`}>
                                <p>{message.message} </p>
                            </div>
                        </div>

                        : ""
                }

            </div>

        }
    </Context.Provider>
}

export const UseContext = () => useContext(Context)