import { Outlet } from "react-router-dom"
import styles from "./style.module.scss"

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  )
}

export default MainLayout
