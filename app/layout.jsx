import '@/styles/globals.css'
import { Amatic_SC, Roboto_Mono } from 'next/font/google'
import Header from '@/components/navbar/Header'
import { Suspense } from 'react'

export const viewport = { themeColor: '#17429f' }
export const amatic = Amatic_SC({ weight: "700", subsets: ["latin"] })
const roboto = Roboto_Mono({ weight: ["300", "400", "500"], style: ["normal"], subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body id="app" className={roboto.className}>


        <Header font={amatic.className} />
        <main>
          <Suspense>
            {children}
          </Suspense>
        </main>



        <footer className='d-flex bg-d f-column-center' >
          <a title="Instagram" target='blank'
            className={amatic.className}
            href='https://www.instagram.com/franco_maidana07/'>
            @Maidana07
          </a>
        </footer>
      </body>
    </html>
  )
}
