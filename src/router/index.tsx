import { Route, Routes } from 'react-router-dom'
import Goals from '../screens/Goals'
import Expenses from '../screens/Expenses'
import Stats from '../screens/Stats'
import React, { FC } from 'react'

export const Routing: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Goals />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  )
}
