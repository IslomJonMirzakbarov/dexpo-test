import { useRoutes } from 'react-router-dom'
import { privateRoutes } from './privateRoute'
import { publicRoutes } from './publicRoute'
import { useSelector } from 'react-redux'
// import nprogress from 'nprogress'
// import { useEffect } from 'react'

const Router = () => {
  const { token } = useSelector((store) => store.auth)

  // let location = useLocation()
  // useEffect(() => {
  //   nprogress.start()
  //   nprogress.done()
  // }, [location.pathname])

  let filteredRoutes
  if (token) filteredRoutes = privateRoutes
  else filteredRoutes = publicRoutes

  const routes = useRoutes(filteredRoutes)

  return routes
}

export default Router
