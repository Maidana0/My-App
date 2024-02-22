import styles from "@/styles/components/Header.module.css"

const Header = ({ title, children }) => (
    <div className={`d-flex ${styles.header}`}>
        <div className={styles.title_contain}>
            <h1>
                {title}
            </h1>
        </div>
        {children}
    </div>
)


export default Header
