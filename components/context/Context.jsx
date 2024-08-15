"use client"
// USAR EL NAVIGATION ROUTER PARA REDIRECCIONAR AL ERROR 404 EN LOGIN Y REGISTER
import { createContext, useContext, useState, useEffect } from "react";
import styles from "@/styles/components/Message.module.css"
import fetchData from "@/utils/fetch";
const Context = createContext()

export const ContextProvider = ({ children }) => {
    const [message, setMessage] = useState(false)
    const [user, setUser] = useState(false)

    useEffect(() => {
        fetchData("account/user", { isLocalReq: true })
            .then(data => data.success ? setUser("connected") : setUser("disconnected"))
            .catch(error => console.log(error))
    }, [])


    const handleMessage = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(false);
        }, 5000);
    }

    const logout = async () => {
        const data = await fetchData("account", { isLocalReq: true })
        if (!data?.success) {
            handleMessage({ success: false, message: "Ocurrio un error para cerrar sesión. Recargue la página." })
            return
        }
        setUser("disconnected")
        handleMessage(data)
    }

    const login = () => {
        setUser("connected")
        handleMessage({ success: true, message: "Sesión iniciada correctamente." })
    }

    return <Context.Provider value={{
        handleMessage,
        user,
        login,
        logout

    }}>
        {children}





        {
            message
                ?
                <div className={`${styles.message_contain}`}>
                    <div >
                        <div className={`${message ? message.success ? styles.success : styles.fail : ""}`}>
                            <p>{message.message} </p>
                        </div>
                    </div>
                </div>
                : ""
        }



    </Context.Provider>
}

export const UseContext = () => useContext(Context)