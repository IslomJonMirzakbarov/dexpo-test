import { useNavigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import styles from "./style.module.scss"

const Login = () => {
  const navigate = useNavigate()

  const navigateToRegistrationForm = () => navigate("/registration")

  return (
    <div className={styles.page}>
      <LoginForm navigateToRegistrationForm={navigateToRegistrationForm} />
    </div>
  )
}

export default Login
