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
  const { edit, remove, isEditing, toggleEditing, isLoading } = useExpense()


  const expenseCategory = useAppSelector(state =>
    state.categories.list.find(category => category.id === expenseItem.categoryId),
  )

  if (!expenseCategory) {
    throw new Error('Invalid category ID')
  }


  return (
    <React.Fragment>
      <div
        className="flex items-center gap-4 p-1 w-full cursor-pointer rounded-xl hover:bg-amber-100"
        onClick={toggleEditing}
      >
        <div className="flex items-center w-10 h-10 justify-center p-2 rounded-xl bg-primary">
          <Icon nameIcon={expenseCategory.iconName} propsIcon={{ size: '24px' }} />
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
        onSaveClick={edit}
        onRemoveClick={remove}
        onClose={toggleEditing}
        loading={isLoading}
      />
    </React.Fragment>
  )
}

export default ExpenseItem
