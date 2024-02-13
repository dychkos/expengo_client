import { FC } from 'react'
import { getFormattedMonth } from '../../app/helper'
import { ExpenseType } from '../../app/types/expense.type'
import { useExpense } from '../../hooks/useExpense'
import ExpensePopup from '../popups/ExpensePopup'
import Button from '../ui/Button'
import ExpenseEmpty from './ExpenseEmpty'
import ExpenseItem from './ExpenseItem'

const ExpenseList: FC<{ expenses: ExpenseType[] }> = ({ expenses }) => {
  const { add, isEditing, toggleEditing } = useExpense()

  const renderExpenses = (expenses: ExpenseType[]) => {
    let currentDate = getFormattedMonth(new Date().toString())

    const sortedByTime = expenses.slice().sort((a, b) => {
      const dateA: Date = new Date(a.createdAt)
      const dateB: Date = new Date(b.createdAt)
      return dateB.getTime() - dateA.getTime()
    })

    return sortedByTime.map((exp, index) => {
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
          <Button icon="AiOutlinePlusCircle" className="ml-auto" onClick={toggleEditing}>
            Нова витрата
          </Button>
          {renderExpenses(expenses)}
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
