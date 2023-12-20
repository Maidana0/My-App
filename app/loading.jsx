import Image from "next/image";
import { amatic } from "./layout";
export default function Loading() {

    return (
        <div style={{
            width: "220px", height: "220px",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto",
            borderRadius: "100%",
            boxShadow: "0 0 20px 2px yellow"
        }}
            className="d-flex bg-d f-column-center">

            <Image
                priority
                src={'/loading.gif'}
                width={119}
                height={140} a
                lt="loading" />

            <h2 className={amatic.className}>
                Cargando...
            </h2>
        </div>
    )
}