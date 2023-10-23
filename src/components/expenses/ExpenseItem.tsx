import React, { useState } from 'react'
import { Icon } from '../Icon'
import { uiTransformDate } from '../../app/helper'
import Popup from '../ui/Popup'
import { Digits } from '../../app/patterns'
import Button from '../ui/Button'
import { ExpenseType } from '../../app/types/expense.type'
import { useAppDispatch } from '../../store'
import { updateExpenseInList } from '../../store/expensesSlice'
import { EditableInput } from '../ui/EditableField'

interface ExpenseItemProps {
  expenseItem: ExpenseType
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expenseItem }) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const [expense, setExpense] = useState<ExpenseType>(expenseItem)

  const dispatch = useAppDispatch()

  const onFieldEdit = (field: keyof typeof expense, value: string) => {
    setExpense({ ...expense, [field]: value })
  }

  const onSaveClick = () => {
    setEditMode(false)
    dispatch(updateExpenseInList(expense as ExpenseType))
  }

  return (
    <>
      <div
        className="flex items-center gap-4 p-1 w-full cursor-pointer rounded-xl hover:bg-amber-100"
        onClick={() => setEditMode(true)}
      >
        <div className="flex items-center justify-center p-2 max-h-full rounded-xl bg-primary">
          <Icon nameIcon={expenseItem.iconName} propsIcon={{ size: '24px' }} />
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
      <Popup
        isOpened={editMode}
        onClose={() => setEditMode(false)}
        className="sm:w-2/3 xl:w-1/3"
      >
        <Popup.Header>Редагування витрати</Popup.Header>
        <div className="flex gap-4 items-center justify-center">
          <div className="flex items-center justify-center p-4 max-h-full rounded-xl bg-primary">
            <Icon nameIcon={expenseItem.iconName} propsIcon={{ size: '36px' }} />
          </div>
          <div className="w-full">
            <EditableInput
              type="text"
              value={expense.price.toString()}
              error={false}
              className="font-default font-bold text-4xl"
              regex={Digits}
              onEdit={(val: string) => onFieldEdit('price', val)}
              inputMode={'numeric'}
              focusDefault={true}
              afterText="грн"
            />
            <EditableInput
              type="text"
              value={expense.title}
              error={false}
              onEdit={(val: string) => onFieldEdit('title', val)}
              className="font-default text-md text-zinc-500"
            />
          </div>
        </div>
        <Popup.Footer>
          <Button onClick={onSaveClick}>Зберегти</Button>
        </Popup.Footer>
      </Popup>
    </>
  )
}

export default ExpenseItem
