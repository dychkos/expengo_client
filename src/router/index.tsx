import { Route, Routes, useLocation } from 'react-router-dom'
import Goals from '../screens/Goals'
import Expenses from '../screens/Expenses'
import Stats from '../screens/Stats'
import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../store'
import { switchMode } from '../store/appSlice'
import { GoalViewMode } from '../app/types/app.type'

export const Routing: FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(switchMode(GoalViewMode.GOAL_LIST))
  }, [location, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Goals />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  )
}
