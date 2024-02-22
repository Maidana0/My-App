import Image from "next/image"

const LocalLoading = ({ num }) => {

    return (
        <div className="d-flex " style={{ height: "100%", witdh: "100%", justifyContent: "center" }}>

            <div
                className="d-flex bg-d f-column-center"
                style={{
                    width: "180px", height: "180px",
                    padding: "0px",
                    borderRadius: "100%",
                    boxShadow: "0 0 20px 2px yellow"
                }}>

                <Image
                    priority
                    src={`/images/loads/${(num && num <= 2) ? num : "1"}.gif`}
                    width={num ? 175 : 160}
                    height={num ? 175 : 160}
                    style={{ borderRadius: "100%", objectFit: "contain" }}
                    alt="cargando..."
                />
            </div>
        </div>

    )
}

export default LocalLoading