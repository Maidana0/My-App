"use client"

import { Sling as Hamburger } from 'hamburger-react'
import { useRef, useState } from 'react'
import NavItems from './NavItems'


const Components = ({ styles }) => {
    const [isOpen, setIsOpen] = useState(false)
    const navContain = useRef(null)
    const fakeBackdrop = useRef(null)

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

    return <>
        <div onClick={setOpen} ref={fakeBackdrop}></div>

        < div ref={navContain} className={`d-flex ${styles.navbar}`} >
            <NavItems styles={styles} setOpen={setOpen} />
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

