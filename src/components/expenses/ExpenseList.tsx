import { FC } from 'react'
import { getFormattedMonth } from '../../app/helper'
import { ExpenseType } from '../../app/types/expense.type'
import Button from '../ui/Button'
import ExpenseEmpty from './ExpenseEmpty'
import ExpenseItem from './ExpenseItem'
import { useAppDispatch } from '../../store'
import { toggleAddingExpense } from '../../store/appSlice'

const ExpenseList: FC<{ expenses: ExpenseType[] }> = ({ expenses }) => {
  const dispatch = useAppDispatch()

  const addExpense = () => {
    dispatch(toggleAddingExpense())
  }

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

  return (
    <section>
      {expenses.length > 0 ? (
        <div>
          <Button icon="AiOutlinePlusCircle" className="ml-auto" onClick={addExpense}>
            Нова витрата
          </Button>
          {renderExpenses(expenses)}
        </div>
      ) : (
        <ExpenseEmpty handleAdding={addExpense} />
      )}
    </section>
  )
}

export default ExpenseList
