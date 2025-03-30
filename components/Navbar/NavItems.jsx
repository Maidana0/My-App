
import { Sling as Hamburger } from 'hamburger-react'
import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import urls from './urls.json'
import { UseContext } from '../context/Context'

const Components = ({ styles }) => {
    const { logout } = UseContext()
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

    return <>
        <div onClick={setOpen} ref={fakeBackdrop}></div>

        < div ref={navContain} className={`d-flex ${styles.navbar}`} >

            <ul className={`d-flex ${styles.nav_items}`}>
                {urls.map((url, i) => {
                    if (url.subItems) {
                        return (
                            <div key={i} className={styles.sub_items_contain}>
                                <div className={styles.divider}> </div>
                                <li className={`${styles.title_sub_items} ${pathName.includes(url.name) && styles.active}`} >
                                    {url.name}
                                </li>
                                <ul>
                                    {url.subItems.map((subItem, i) => {
                                        return (
                                            <li key={`${url.name}-${i}`} className={`${styles.nav_links} ${isActive(subItem.path) && styles.active}`}>
                                                <Link href={subItem.path} onClick={setOpen}>{subItem.name} </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className={styles.divider}> </div>
                            </div>
                        )
                    } else {
                        return (
                            <li key={i} className={`${styles.nav_links} ${isActive(url.path) && styles.active}`} >
                                <Link href={url.path} onClick={setOpen}>{url.name} </Link>
                            </li>
                        )

                    }
                })}
                <li className={`${styles.nav_links} ${styles.logout_link}`} style={{ margin: "2rem auto 1rem" }} >
                    <Link onClick={() => {
                        setOpen()
                        logout()
                    }} href={"/"}>
                        Cerrar Sesión
                    </Link>
                </li>
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

