import styles from '@/styles/Auth.module.css'

export default function Loading() {
  return (
    <div className={`d-flex ${styles.auth_contain}`}>
      <div className={`d-flex ${styles.auth_header}`}>
        <div style={{ width: 100, height: 100, borderRadius: '50%' }} className="input-skeleton"></div>
        <h1>My Personal Web App</h1>
      </div>

      <div className={`d-flex ${styles.login_contain}`}>
        <form>
          <div className="input-skeleton"></div>
          <div className="input-skeleton"></div>
          <div className="button-skeleton" style={{ width: "70%", background: "linear-gradient(90deg, #0056d6 25%, #054ab3ff 37%, #0056d6 63%)" }}></div>
        </form>
        <div className={`d-flex ${styles.buttons_contain}`}>
          <div className="button-skeleton" style={{ width: "45%", background: "linear-gradient(90deg, #2929295d 25%, #1b1b1b5d 37%, #2929295d 63%)" }}></div>
          <div className="button-skeleton" style={{ width: "45%", background: "linear-gradient(90deg, #2929295d 25%, #1b1b1b5d 37%, #2929295d 63%)" }}></div>
        </div>
        <div className="button-skeleton" style={{ width: "70%", background: "linear-gradient(90deg, #008a55 25%, #01643eff 37%, #008a55 63%)" }}></div>
      </div>
    </div>
  )
}