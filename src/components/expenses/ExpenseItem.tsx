import React from 'react'
import { Icon } from '../Icon'
import { uiTransformDate } from '../../app/helper'
import { ExpenseType } from '../../app/types/expense.type'
import { useAppSelector } from '../../store'
import ExpensePopup from '../popups/ExpensePopup'
import { useExpense } from '../../hooks/useExpense'

interface ExpenseItemProps {
  expenseItem: ExpenseType
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expenseItem }) => {
  const { addExpense, removeExpense, isEditing, toggleEditing } = useExpense()

  const expenseGoal = useAppSelector(state =>
    state.goals.list.find(goal => goal.id === expenseItem.goalId),
  )

  if (!expenseGoal) {
    throw new Error('Invalid goal ID')
  }

  return (
    <React.Fragment>
      <div
        className="flex items-center gap-4 p-1 w-full cursor-pointer rounded-xl hover:bg-amber-100"
        onClick={toggleEditing}
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
        isOpened={isEditing}
        expense={expenseItem}
        onSaveClick={addExpense}
        onRemoveClick={removeExpense}
        onClose={toggleEditing}
      />
    </React.Fragment>
  )
}

export default ExpenseItem
