import React from 'react'
import { getFormattedMonth } from '../../app/helper'
import { ExpenseType } from '../../app/types/expense.type'
import ExpenseItem from './ExpenseItem'

interface ExpensesListProps {
  expenses: ExpenseType[]
}

const ExpenseList: React.FC<ExpensesListProps> = ({ expenses }) => {
  const renderExpenses = (expenses: ExpenseType[]) => {
    let currentDate = getFormattedMonth(new Date().toString())

    return expenses.map((exp, index) => {
      const currentMonth = getFormattedMonth(exp.createdAt)
      if (currentMonth !== currentDate || index === 0) {
        currentDate = currentMonth

        return (
          <div key={exp.id}>
            <span className="text-gray-800 font-medium">{currentMonth}</span>
            <div className="my-2">
              <ExpenseItem expenseItem={exp} />
            </div>
          </div>
        )
      }

      return (
        <div className="my-6" key={exp.id}>
          <ExpenseItem expenseItem={exp} />
        </div>
      )
    })
  }

  return <section>{renderExpenses(expenses)}</section>
}

export default ExpenseList
