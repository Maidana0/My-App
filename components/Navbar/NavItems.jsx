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
                const isActive = url.paths ? pathName.includes(url.name) : pathName.endsWith(url.path)

                return url.paths
                    ?
                    <li key={i}>
                        <Link
                            href={'#'} onClick={() => setSubMenu(!subMenuIsActive)}
                            className={`${styles.nav_links} ${isActive && styles.active}`}>
                            {url.name}
                        </Link>

                        {subMenuIsActive &&
                            <ul>
                                {url.paths.map(({ path, name }) => {
                                    const subMenu = pathName.endsWith(path)
                                    return <li key={path} className={` ${styles.nav_links} ${subMenu && styles.sub_active}`} >
                                        <Link href={path} onClick={() => {
                                            setOpen()
                                            setSubMenu(!subMenuIsActive)
                                        }}>
                                            {name}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        }
                    </li>
                    :
                    <li key={i} className={`${styles.nav_links} ${isActive && styles.active}`} >
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