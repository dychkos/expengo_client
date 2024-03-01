import { FC, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CategoryViewMode } from '../app/types/app.type'
import Categories from '../screens/Categories'
import Expenses from '../screens/Expenses'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Stats from '../screens/Stats'
import { useAppDispatch } from '../store'
import { switchCategoryView } from '../store/appSlice'
import PrivateRoutes from './privateRoutes'

export const Routing: FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(switchCategoryView(CategoryViewMode.CATEGORY_LIST))
  }, [location, dispatch])

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Categories />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/stats" element={<Stats />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
