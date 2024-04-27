"use client"
import styles from '@/styles/components/Navbar.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { UseContext } from '../context/Context'
import Image from 'next/image'
const NavItems = dynamic(() => import('./NavItems'), { ssr: false })

export default function Header({ font }) {
    const { user } = UseContext()
    return (
        <header>
            <nav className={`${font}  ${styles.navbar_contain} d-flex bg-d`}>
                <div className="d-flex">
                    <Image src={"/brook_icon.png"} alt="app-icon" width={44} height={44} />
                    <Link className={styles.name_page} href={'/'}>My Personal Web App</Link>
                </div>


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