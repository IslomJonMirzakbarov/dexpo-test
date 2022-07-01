import { useRoutes } from "react-router-dom"
import { privateRoutes } from "./privateRoute"
import { publicRoutes } from "./publicRoute"
import { useSelector } from "react-redux"

const Router = () => {
  const { signature } = useSelector(store => store.wallet)
  const routes = useRoutes( signature ? privateRoutes :publicRoutes )

  return routes
}

export default Router
