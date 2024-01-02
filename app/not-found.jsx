import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: 'My App - Error',
    description: 'This page could not be found..',
  }

export default function NotFound() {
    return (
        <div style={{margin:"4rem auto", padding:"1rem 0", width:"350px"}} className="d-flex bg-d f-column-center">
            <h1>404</h1>
            <Image
                priority
                src={'/error.gif'}
                width={320}
                height={280}
                style={{ objectFit: "contain" }}
                alt="Error"
            />
            <p>This page could not be found.</p>
            <Link style={{ color: "yellow", paddingTop: "20px" }} href={'/'}>Volver al inicio</Link>
        </div>
    )
}