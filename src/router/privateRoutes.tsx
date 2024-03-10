import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../store'

const PrivateRoutes = () => {
  const isAuth = useAppSelector(state => state.user.isAuthorized)
  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
