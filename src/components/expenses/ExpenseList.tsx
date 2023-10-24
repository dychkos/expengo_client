import { FC } from 'react'
import ExpenseItem from './ExpenseItem'
import { ExpenseType } from '../../app/types/expense.type'

const ExpenseList: FC<{ expenses: ExpenseType[] }> = ({ expenses }) => {
  return (
    <section>
      {expenses.map(exp => (
        <div className="my-6" key={exp.id}>
          <ExpenseItem expenseItem={exp} />
        </div>
      ))}
    </section>
  )
}

export default ExpenseList
