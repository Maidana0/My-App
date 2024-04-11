"use client"

import Link from "next/link"
import Image from "next/image";
import { useSearchParams } from "next/navigation";
const hola = ["hola", "chau"]
hola.toString()
const Error = ({ message, status, height }) => {
    const params = useSearchParams()
    const messageQuery = params.has("message") && params.get("message")
    const statusQuery = params.has("status") && params.get("status")

    return (
        <div style={{ height: height ? height : "100vh", width: "100%" }}
            className="d-flex bg-d f-column-center"
        >
            <h1 style={{ margin: "1rem auto", textAlign: "center" }}>Ups! Ocurrio un error {status ? status : statusQuery ? `- ${statusQuery}` : ""}</h1>
            <Image
                priority
                src={'/error.gif'}
                width={184}
                height={144}
                alt="Error"
            />
            <p style={{ margin: "1rem auto", textAlign: "center", width: "90%" }}>
                {message ? message : messageQuery ? messageQuery : "This page could not be found."}
            </p>
            <Link
                style={{ color: "yellow", margin: "1rem auto 2rem" }}
                href={'/'}>Volver al inicio</Link>
        </div>
    )
}



export default Error