"use client"
import { usePathname } from 'next/navigation'
import { Sling as Hamburger } from 'hamburger-react'





export const HamburgerBtn = ({ styles }) =>
    <div className={styles.nav_btn}>
        <Hamburger
            color="yellow"
            onToggle={toggled => {
                const nav = document.getElementById('nav')
                toggled ? nav.classList.add(styles.nav_active) : nav.classList.remove(styles.nav_active)
            }}
        />
    </div>

export const NavItems = ({ styles, link: Link, paths }) =>
    <ul className={`d-flex ${styles.nav_items}`}>
        {paths.map((path) => {
            const pathName = usePathname()
            const isActive = pathName.endsWith((`/${path}`))
            return (
                <Link key={path} href={`/${path}`}
                    className={`${styles.nav_links} ${isActive ? styles.active : ''}`} >
                    <li >
                        {path}
                    </li>
                </Link>
            )
        }
        )}
    </ul>