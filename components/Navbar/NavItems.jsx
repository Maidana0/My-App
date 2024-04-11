"use client"

import { Sling as Hamburger } from 'hamburger-react'
import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import urls from './urls.json'


const Components = ({ styles }) => {
    const [isOpen, setIsOpen] = useState(false)
    const navContain = useRef(null)
    const fakeBackdrop = useRef(null)
    const pathName = usePathname()


    const setOpen = () => {
        const app = document.getElementById('app')
        setIsOpen(!isOpen)

        if (isOpen) {
            app && app.classList.remove(styles.hidden)
            fakeBackdrop.current.classList.remove(styles.backdrop)
            navContain.current.classList.remove(styles.nav_active)
            return
        }

        app && app.classList.add(styles.hidden)
        fakeBackdrop.current.classList.add(styles.backdrop)
        navContain.current.classList.add(styles.nav_active)
    }

    const isActive = (path) => pathName.endsWith(path)


    // return <Link style={{fontSize:"1.5em"}} className={isActive("/cuenta") && styles.active}
    //     href={"/cuenta"}>Iniciar Sesión</Link>


    return <>
        <div onClick={setOpen} ref={fakeBackdrop}></div>

        < div ref={navContain} className={`d-flex ${styles.navbar}`} >

            <ul className={`d-flex ${styles.nav_items}`}>
                {urls.map((url, i) => (
                    <li key={i} className={`${styles.nav_links} ${isActive(url.path) && styles.active}`} >
                        <Link href={url.path} onClick={setOpen}>{url.name} </Link>
                    </li>
                ))}
            </ul >
        </div >

        <div className={`${styles.nav_btn} ${isOpen && styles.clicked}`}>
            <Hamburger
                distance="lg"
                toggled={isOpen}
                toggle={setOpen}
            />
        </div >
    </>


}

export default Components

