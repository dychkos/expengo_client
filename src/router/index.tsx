import { Route, Routes, useLocation } from 'react-router-dom'
import Categories from '../screens/Categories'
import Expenses from '../screens/Expenses'
import Stats from '../screens/Stats'
import Login from '../screens/Login'
import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../store'
import { switchCategoryView } from '../store/appSlice'
import { CategoryViewMode } from '../app/types/app.type'
import Register from '../screens/Register'

export const Routing: FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(switchCategoryView(CategoryViewMode.CATEGORY_LIST))
  }, [location, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Categories />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
