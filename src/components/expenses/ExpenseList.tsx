import React, { FC } from 'react'
import ExpenseItem from './ExpenseItem'
import { ExpenseType } from '../../app/types/expense.type'
import ExpenseEmpty from './ExpenseEmpty'

const ExpenseList: FC<{ expenses: ExpenseType[] }> = ({ expenses }) => {
  return (
    <section>
      {expenses.length > 0 ? (
        expenses.map(exp => (
          <div className="my-6" key={exp.id}>
            <ExpenseItem expenseItem={exp} />
          </div>
        ))
      ) : (
        <ExpenseEmpty />
      )}
    </section>
  )
}

export default ExpenseList
