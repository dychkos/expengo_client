import React from 'react'
import { ExpenseType } from '../app/types/expense.type'
import { useAppDispatch, useAppSelector } from '../store'
import { useDestroyExpenseMutation, useStoreExpenseMutation } from '../store/api/expenses.api'
import { updateExpenseInList } from '../store/expensesSlice'

export const useExpense = () => {
  const [isEditing, setIsEditing] = React.useState(false)
  const isLoading = useAppSelector(state => state.expenses.loading)
  const [destroyExpense] = useDestroyExpenseMutation()
  const [storeExpense] = useStoreExpenseMutation()
  const dispatch = useAppDispatch()

  const add = async (expense: ExpenseType) => {
    await storeExpense(expense)

    setIsEditing(false)
  }

  const edit = (expense: ExpenseType) => {
    dispatch(updateExpenseInList(expense))

    setIsEditing(false)
  }

  const remove = async (expense: ExpenseType) => {
    await destroyExpense(expense)
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
    isLoading,
  }
}
