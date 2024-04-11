import styles from '@/styles/components/Navbar.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const NavItems = dynamic(() => import('./NavItems'), { ssr: false })

export default function Header({ font }) {
    return (
        <header>
            <nav className={`${font}  ${styles.navbar_contain} d-flex bg-d`}>
                <Link className={styles.name_page} href={'/'}>My Personal WebSite</Link>

                                
                <NavItems styles={styles} />

            </nav>
        </header>

    )
}