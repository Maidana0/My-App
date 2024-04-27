import Image from 'next/image'


// const Loading = dynamic(() => import('@/components/loads/PageLoading'), { ssr: false })

const Loading = () => <div className="d-flex f-column-center" style={{ background: "black", justifyContent: "center", width: "100%", height: "80vh" }}>
    <Image src={"/loading.gif"} alt="loading" width={179} height={200} style={{filter: "drop-shadow(0 0 10px var(--secondary-color))"}} />
    <h1 style={{ fontFamily: "__Amatic_SC_c41a4c", fontSize: "1.5em", textAlign: "center", color: "#fff" }}>Cargando...</h1>
</div>


export default Loading