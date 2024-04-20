"use client"
import styles from '@/styles/components/Navbar.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { UseContext } from '../context/Context'

const NavItems = dynamic(() => import('./NavItems'), { ssr: false })

export default function Header({ font }) {
    const { user } = UseContext()
    return (
        <header>
            <nav className={`${font}  ${styles.navbar_contain} d-flex bg-d`}>
                <Link className={styles.name_page} href={'/'}>My Personal WebSite</Link>


                {
                    user ?
                        user == "connected"
                            ? <NavItems styles={styles} />
                            : <div className={`d-flex ${styles.nav_login}`} >
                                <Link href={"/cuenta"}>Conectarme</Link>
                            </div >
                        : ""
                }


            </nav>
        </header>

    )
}