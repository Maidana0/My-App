import Image from "next/image";


const PageLoading = () => {
    return (
        <div className="d-flex " style={{
            position: "absolute",
            backgroundColor: "#1a1a407e",
            height: "100vh",
            width: "100%",
            zIndex: 101,
            justifyContent: "center",
        }}>

            <div
                className="d-flex bg-d f-column-center"
                style={{
                    width: "220px", height: "220px",
                    borderRadius: "100%",
                    boxShadow: "0 0 20px 2px yellow"

                }}>

                <Image
                    priority
                    src={'/loading.gif'}
                    width={119}
                    height={140}
                    alt="loading" />
                <h2 >
                    {/* className={amatic.className} */}
                    Cargando...
                </h2>
            </div>
        </div>
    )
}

export default PageLoading