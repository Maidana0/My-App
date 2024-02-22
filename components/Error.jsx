import Link from "next/link"
import Image from "next/image";

export const Error = () => {
    return (
        <div style={{ height: "100vh", width: "100%" }}
            className="d-flex bg-d f-column-center"
        >
            <h1>404</h1>
            <Image
                priority
                src={'/error.gif'}
                width={184}
                height={144}
                alt="Error"
            />
            <p>This page could not be found.</p>
            <Link
                style={{ color: "yellow", paddingTop: "20px" }}
                href={'/'}>Volver al inicio</Link>
        </div>
    )
}



