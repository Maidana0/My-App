import Image from 'next/image'
import styles from '@/styles/Home.module.css'

export const metadata = {
  title: 'My App',
  description: 'Sitio web personal para atender y ordenar ciertas cuestiones.',
}

export default function Home() {
  return (
      <div className={`d-flex contain bg-d ${styles.home}`}>
        hola
      </div>
  )
}
