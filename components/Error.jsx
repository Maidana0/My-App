"use client"

import Link from "next/link"
import Image from "next/image";
import { useSearchParams } from "next/navigation";


const Error = ({ message, status, height }) => {
    const params = useSearchParams()
    const messageQuery = params?.has("message") && params.get("message")
    const statusQuery = params?.has("status") && params.get("status")

    return (
        <div style={{ minHeight: height ?? "80vh", padding: "2rem 0", width: "100%", gap: "3rem", fontSize: "1.3em" }}
            className="d-flex bg-d f-column-center"
        >
            <h1 style={{ textAlign: "center", padding: "0 1rem" }}>Ups! Ocurrio un error {status ? status : statusQuery ? `- ${statusQuery}` : ""}</h1>
            <Image
                priority
                src={'/error.gif'}
                width={184}
                height={144}
                alt="Error"
            />
            <p style={{ textAlign: "center", width: "90%" }}>
                {message ? message : messageQuery ? messageQuery : "This page could not be found."}
            </p>
            <Link
                style={{ color: "yellow" }}
                href={'/'}>Volver al inicio</Link>
        </div>
    )
}



export default Error