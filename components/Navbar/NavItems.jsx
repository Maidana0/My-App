import { usePathname } from 'next/navigation'
import Link from 'next/link'
import urls from './urls.json'
import { useState } from 'react'

const NavItems = ({ styles, setOpen }) => {
    const pathName = usePathname()
    const [subMenuIsActive, setSubMenu] = useState(false)
    return <ul className={`d-flex ${styles.nav_items}`}>
        {
            urls.map((url, i) => {
                const isActive = pathName.endsWith(url.path)

                return <li key={i} className={`${styles.nav_links} ${isActive && styles.active}`} >
                    <Link href={url.path} onClick={() => {
                        setOpen()
                        subMenuIsActive && setSubMenu(!subMenuIsActive)
                    }}>
                        {url.name}
                    </Link>
                </li>
            })
        }
    </ul >
}

export default NavItems