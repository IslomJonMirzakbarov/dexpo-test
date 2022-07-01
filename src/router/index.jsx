import { useRoutes } from "react-router-dom"
import { privateRoutes } from "./privateRoute"
import { publicRoutes } from "./publicRoute"
import { useSelector } from "react-redux"

const Router = () => {
  const { token } = useSelector(store => store.auth)
  const filteredRoutes = token ? privateRoutes : publicRoutes
  const routes = useRoutes( filteredRoutes )
  
  return routes
}

export default Router
