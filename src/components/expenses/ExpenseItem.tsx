import React, { useState } from 'react'
import { Icon } from '../Icon'
import { uiTransformDate } from '../../app/helper'
import { ExpenseType } from '../../app/types/expense.type'
import { useAppDispatch, useAppSelector } from '../../store'
import ExpensePopup from '../popups/ExpensePopup'
import { updateExpenseInList } from '../../store/expensesSlice'

interface ExpenseItemProps {
  expenseItem: ExpenseType
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expenseItem }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const expenseGoal = useAppSelector(state =>
    state.goals.list.find(goal => goal.id === expenseItem.goalId),
  )

  if (!expenseGoal) {
    throw new Error('Invalid goal ID')
  }

  const onSaveClick = (expense: ExpenseType) => {
    setEditMode(false)
    dispatch(updateExpenseInList(expense))
  }

  return (
    <>
      <div
        className="flex items-center gap-4 p-1 w-full cursor-pointer rounded-xl hover:bg-amber-100"
        onClick={() => setEditMode(true)}
      >
        <div className="flex items-center justify-center p-2 max-h-full rounded-xl bg-primary">
          <Icon nameIcon={expenseGoal.iconName} propsIcon={{ size: '24px' }} />
        </div>
        <div className="w-full">
          <h3 className="font-default font-bold text-md text-clip overflow-hidden">
            {expenseItem.title}
          </h3>
          <span className="font-default text-gray-400 font-medium text-sm">
            {uiTransformDate(expenseItem.createdAt)}
          </span>
        </div>
        <div className="ml-auto">
          <p className="font-default whitespace-nowrap">- {expenseItem.price} грн</p>
        </div>
      </div>
      <ExpensePopup
        isOpened={editMode}
        expense={expenseItem}
        onSaveClick={onSaveClick}
        onClose={() => setEditMode(false)}
      />
    </>
  )
}

export default ExpenseItem
