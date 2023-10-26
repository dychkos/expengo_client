import React from 'react'
import Layout from '../components/layouts/Layout'
import ExpenseList from '../components/expenses/ExpenseList'
import { useAppSelector } from '../store'

const Expenses = () => {
  const expenses = useAppSelector(state => state.expenses.list)

  return (
    <Layout className="w-full sm:w-full md:w-2/3 xl:w-1/3">
      <ExpenseList expenses={expenses} />
    </Layout>
  )
}

export default Expenses
