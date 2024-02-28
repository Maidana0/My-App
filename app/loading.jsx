import dynamic from 'next/dynamic'


// const Loading = dynamic(() => import('@/components/loads/PageLoading'), { ssr: false })
const Loading = ()=><h1 style={{background:"black", color:"#fff"}}>Cargando...</h1>


export default Loading