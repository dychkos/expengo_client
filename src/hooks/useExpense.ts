import React from 'react'
import { ExpenseType } from '../app/types/expense.type'
import { useAppDispatch } from '../store'
import {
  createExpense,
  removeExpenseInList,
  updateExpenseInList,
} from '../store/expensesSlice'

export const useExpense = () => {
  const [isEditing, setIsEditing] = React.useState(false)
  const dispatch = useAppDispatch()

  const add = (expense: ExpenseType) => {
    dispatch(
      createExpense({
        ...expense,
        createdAt: new Date(Date.now()).toISOString(),
      }),
    )

    setIsEditing(false)
  }

  const edit = (expense: ExpenseType) => {
    dispatch(updateExpenseInList(expense))

    setIsEditing(false)
  }

  const remove = (expense: ExpenseType) => {
    dispatch(removeExpenseInList(expense))
    setIsEditing(false)
  }

  const toggleEditing = () => {
    setIsEditing(prev => !prev)
  }

  return {
    isEditing,
    add,
    edit,
    remove,
    toggleEditing,
  }
}
