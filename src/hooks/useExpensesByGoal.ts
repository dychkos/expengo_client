import { RootState, useAppSelector } from '../store'
import { useSelector } from 'react-redux'

export const useExpensesByGoal = (goalId: string) => {
  return useAppSelector(state =>
    state.expenses.list.reduce((acc, item) => {
      if (item.goalId === goalId) {
        acc += Number(item.price)
      }
      return acc
    }, 0),
  )
}

export const useStatsSelector = () => {
  const goals = useSelector((state: RootState) => state.goals.list)
  const expensesList = useSelector((state: RootState) => state.expenses.list)
  const total = useAppSelector(state =>
    state.expenses.list.reduce((expenseAcc, item) => {
      expenseAcc += Number(item.price)
      return expenseAcc
    }, 0),
  )

  const calculateTotalPrice = (goalId: string) => {
    const total = expensesList.reduce((expenseAcc, item) => {
      if (item.goalId === goalId) {
        expenseAcc += Number(item.price)
      }
      return expenseAcc
    }, 0)

    return {
      goalId,
      category: goals.find(goal => goal.id === goalId)?.category,
      totalPrice: total,
    }
  }

  const stats = goals.map(goal => calculateTotalPrice(goal.id))

  return {
    stats,
    total,
  }
}
