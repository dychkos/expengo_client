import React from 'react'
import { useAppDispatch } from '../store'
import { ExpenseType } from '../app/types/expense.type'
import {
  createExpense,
  removeExpenseInList,
  updateExpenseInList,
} from '../store/expensesSlice'

export const useExpense = (withCreate = false) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const dispatch = useAppDispatch()

  const addExpense = (expense: ExpenseType) => {
    if (withCreate) {
      dispatch(createExpense(expense))
    } else {
      updateExpenseInList(expense)
    }
    setIsEditing(false)
  }

  const removeExpense = (expense: ExpenseType) => {
    dispatch(removeExpenseInList(expense))
    setIsEditing(false)
  }

  const toggleEditing = () => {
    setIsEditing(prev => !prev)
  }

  return {
    isEditing,
    addExpense,
    removeExpense,
    toggleEditing,
  }
}
