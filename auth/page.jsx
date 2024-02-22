import Image from 'next/image'
import styles from '@/styles/Auth.module.css'
import Login from './Components/Login'

export default function Auth() {


  return (
    <>
      <div className={`d-flex ${styles.auth_contain}`}>
        <div className={`d-flex ${styles.auth_header}`}>
          <Image priority
            src={'/images/icon.png'} alt='Luffy Icon'
            width={100} height={100} />
          <h1>My Personal App</h1>
        </div>

        <Login styles={styles} />

      </div>
    </>
  )
}
