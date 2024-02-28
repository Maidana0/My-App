"use client"
import styles from "@/styles/components/Title.module.css"
import Link from "next/link"
import { usePathname } from 'next/navigation'



const Title = ({ title, linkTitle, linkContent }) => {
    const pathName = usePathname()
    const isActive = linkTitle && pathName.endsWith(linkTitle.path)

    return (
        <div className={`d-flex ${styles.title_contain}`}>
            {
                linkTitle ?
                    <Link className={`${styles.title} ${isActive && styles.active}`}
                        href={linkTitle.path}>
                        {linkTitle.name}
                    </Link>
                    :
                    <h1 className={styles.title} >{title}</h1>
            }

            {linkContent && <div className={`d-flex ${styles.title_children_contain}`}>{


                linkContent.length == 1 ?
                    <Link href={linkContent.path} >
                        {linkContent.name}
                    </Link>
                    :
                    linkContent.map((child, i) => {
                        const isActive = pathName.endsWith(child.path)

                        return (
                            <Link className={isActive ? styles.active : ''} key={i} href={child.path} >
                                {child.name}
                            </Link>
                        )
                    })


            }</div>}


        </div>
    )
}
export default Title
