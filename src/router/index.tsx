import { Route, Routes, useLocation } from 'react-router-dom'
import Goals from '../screens/Goals'
import Expenses from '../screens/Expenses'
import Stats from '../screens/Stats'
import Login from '../screens/Login'
import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../store'
import { switchGoalView } from '../store/appSlice'
import { GoalViewMode } from '../app/types/app.type'
import Register from '../screens/Register'

export const Routing: FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(switchGoalView(GoalViewMode.GOAL_LIST))
  }, [location, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Goals />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
