import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'

import Image from 'next/image'
import { HamburgerBtn, NavItems } from './Components'

const paths = ['calendario', 'horarios', 'notas','objetivos']

export default function Navbar({ font }) {

    return (
        <header className={`${font} d-flex bg-d`}>
            <div className={`${styles.app} d-flex`}>
                <Image
                    priority={true}
                    src={'/images/icon.png'}
                    width={55}
                    height={50}
                    alt='Luffy Icon'
                />
                <h1> <Link href={'/'}>My App</Link></h1>
            </div>

            <nav id="nav" className={styles.navbar}>
                <NavItems styles={styles} paths={paths} link={Link} />
            </nav>

            <HamburgerBtn styles={styles} />
        </header>

    )
}