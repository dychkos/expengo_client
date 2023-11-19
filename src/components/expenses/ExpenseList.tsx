import React, { FC } from 'react'
import ExpenseItem from './ExpenseItem'
import { ExpenseType } from '../../app/types/expense.type'
import ExpenseEmpty from './ExpenseEmpty'
import { useExpense } from '../../hooks/useExpense'
import ExpensePopup from '../popups/ExpensePopup'
import Button from '../ui/Button'

const ExpenseList: FC<{ expenses: ExpenseType[] }> = ({ expenses }) => {
  const { add, isEditing, toggleEditing } = useExpense()

  return (
    <section>
      {expenses.length > 0 ? (
        <div>
          <Button icon="AiOutlinePlusCircle" className="ml-auto" onClick={toggleEditing}>
            Нова витрата
          </Button>
          {expenses.map(exp => (
            <div className="my-6" key={exp.id}>
              <ExpenseItem expenseItem={exp} />
            </div>
          ))}
        </div>
      ) : (
        <ExpenseEmpty handleAdding={toggleEditing} />
      )}
      <ExpensePopup
        onSaveClick={add}
        isOpened={isEditing}
        focusOnShow={true}
        onClose={toggleEditing}
      />
    </section>
  )
}

export default ExpenseList
