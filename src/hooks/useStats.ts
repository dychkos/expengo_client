import { useAppSelector } from '../store'
import { StatsOptions } from '../app/types/app.type'
import { filterByCurrentWeek } from '../app/helper'

const defaultOptions: StatsOptions = {
  targetMonth: new Date(Date.now()).getMonth(),
  targetYear: new Date(Date.now()).getFullYear(),
  totalValues: false,
  includeCurrentWeek: false,
}

export const useExpenseCountByGoal = (
  goalId: string,
  options: StatsOptions = defaultOptions,
) => {
  let expensesList = useAppSelector(state => state.expenses.list)
  let weekStartDay = useAppSelector(state => state.config.weekStartDay)

  const { targetMonth, targetYear, totalValues, includeCurrentWeek } = options

  if (!totalValues) {
    if (includeCurrentWeek) {
      expensesList = filterByCurrentWeek(expensesList, weekStartDay)
    } else {
      expensesList = expensesList.filter(expense => {
        const expenseDate = new Date(expense.createdAt)
        return (
          expenseDate.getMonth() === targetMonth &&
          expenseDate.getFullYear() === targetYear
        )
      })
    }
  }

  return expensesList.reduce((acc, item) => {
    if (item.goalId === goalId) {
      acc += Number(item.price)
    }
    return acc
  }, 0)
}

export const useStatsSelector = () => {
  const goals = useAppSelector(state => state.goals.list)
  const expensesList = useAppSelector(state => state.expenses.list)
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
