import dynamic from "next/dynamic"

export const metadata = {
    title: 'My App - Error',
    description: 'This page could not be found..',
}

const NotFound = dynamic(() => import('../components/Error'),{ssr:false})
export default NotFound