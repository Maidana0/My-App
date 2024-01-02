import '@/styles/globals.css'
import { Amatic_SC, Roboto_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import ContextProvider from '@/components/Context'
export const amatic = Amatic_SC({ weight: "700", subsets: ["latin"] })
const roboto = Roboto_Mono({ weight: ["300", "400", "500"], style: ["normal"], subsets: ["latin"] })



export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Navbar
          font={amatic.className}
        />
        <main>
          <ContextProvider>
            {children}
          </ContextProvider>
        </main>

        <footer className='d-flex bg-d f-column-center' >
          <h2 className={amatic.className}>My Personal WebSite</h2>
          <small><a href='https://www.instagram.com/franco_maidana07/' title="Instagram" target='blank'>@Maidana</a></small>
        </footer>
      </body>
    </html>
  )
}
