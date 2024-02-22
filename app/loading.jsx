import dynamic from 'next/dynamic'


const Loading = dynamic(() => import('@/components/loads/PageLoading'), { ssr: false })

export default Loading