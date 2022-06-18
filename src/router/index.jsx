import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../views/Auth/Login"
import CollectionItem from "../views/Collections/Item"
import Home from "../views/Home"

const Router = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)

  if (!isAuth)
    return (
      <Routes>
        <Route path="/">
          <Route path="home" element={<Home />} />
          <Route path="marketplace" element={<h2>Marketplace</h2>} />
          <Route path="/marketplace/:id" element={<CollectionItem />} />
          
          <Route index element={<Navigate to="/login " />} />
          
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="marketplace" element={<h2>Marketplace</h2>} />
        <Route path="/marketplace/:id" element={<h2>Marketplace details</h2>} />
        <Route path="*" element={<Navigate to="home" />} />
      </Route>
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  )
}

export default Router
