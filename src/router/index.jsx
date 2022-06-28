import { useRoutes } from "react-router-dom"
import { useWeb3React } from '@web3-react/core'
import { privateRoutes } from "./privateRoute"
import { publicRoutes } from "./publicRoute"

const Router = () => {
  // const { account } = useWeb3React()
  const routes = useRoutes( publicRoutes )

  return routes
}

export default Router
