import { getRandomColor } from '../app/helper'
import { ExpenseType } from '../app/types/expense.type'
import { StatsDiapason, StatsItem } from '../app/types/stats.type'
import { useAppSelector } from '../store'

interface GetTotalExpenseOptions {
  forWeek?: boolean
  targetMonth?: number
  targetYear?: number
  getTotal?: boolean
}

interface GetStatsOptions {
  diapason?: StatsDiapason
  targetMonth?: number
  targetYear?: number
  getTotal?: boolean
}

const filterByCurrentWeek = (
  expense: ExpenseType[],
  weekStartDay: number,
): ExpenseType[] => {
  const now = new Date()
  const startOfCurrentWeek = new Date(now)
  const dayOfWeek = now.getDay()
  const diff = (dayOfWeek - weekStartDay + 7) % 7

  startOfCurrentWeek.setDate(now.getDate() - diff)
  startOfCurrentWeek.setHours(0, 0, 0, 0)

  const endOfCurrentWeek = new Date(startOfCurrentWeek)
  endOfCurrentWeek.setDate(endOfCurrentWeek.getDate() + 7)
  endOfCurrentWeek.setHours(0, 0, 0, 0)

  return expense.filter(ob => {
    const createdAtDate = new Date(ob.createdAt)
    return createdAtDate >= startOfCurrentWeek && createdAtDate < endOfCurrentWeek
  })
}

export const filterByYearAndMonth = (
  expenses: ExpenseType[],
  targetYear: number,
  targetMonth: number,
): ExpenseType[] => {
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.createdAt)
    return (
      expenseDate.getMonth() === targetMonth && expenseDate.getFullYear() === targetYear
    )
  })
}

export const filterByYear = (
  expenses: ExpenseType[],
  targetYear: number,
): ExpenseType[] => {
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.createdAt)
    return expenseDate.getFullYear() === targetYear
  })
}

const calculateExpensesInCategory = (
  expenses: ExpenseType[],
  categoryId: string,
): number => {
  return expenses.reduce((acc, item) => {
    if (item.categoryId === categoryId) {
      acc += Number(item.price)
    }
    return acc
  }, 0)
}

export const useExpensesInCategory = (
  categoryId: string,
  {
    forWeek = false,
    targetMonth = new Date(Date.now()).getMonth(),
    targetYear = new Date(Date.now()).getFullYear(),
    getTotal = false,
  }: GetTotalExpenseOptions,
) => {
  let expensesList = useAppSelector(state => state.expenses.list)
  let weekStartDay = useAppSelector(state => state.config.weekStartDay)

  if (!getTotal) {
    expensesList = forWeek
      ? filterByCurrentWeek(expensesList, weekStartDay)
      : filterByYearAndMonth(expensesList, targetYear, targetMonth)
  }

  return calculateExpensesInCategory(expensesList, categoryId)
}

export const useStats = ({
  diapason = 'month',
  targetMonth = new Date(Date.now()).getMonth(),
  targetYear = new Date(Date.now()).getFullYear(),
  getTotal = false,
}: GetStatsOptions): StatsItem[] => {
  let categoriesList = useAppSelector(state => state.categories.list)
  let expensesList = useAppSelector(state => state.expenses.list)
  let weekStartDay = useAppSelector(state => state.config.weekStartDay)

  if (!getTotal) {
    switch (diapason) {
      case 'week': {
        expensesList = filterByCurrentWeek(expensesList, weekStartDay)
        break
      }
      case 'month': {
        expensesList = filterByYearAndMonth(expensesList, targetYear, targetMonth)
        break
      }
      case 'year': {
        expensesList = filterByYear(expensesList, targetYear)
        break
      }
    }
  }

  const total = calculateTotalExpense(expensesList)

  return categoriesList.flatMap(cat => {
    const cost = calculateExpensesInCategory(expensesList, cat.id)
    if (cost === 0) {
      return []
    }
    return {
      category: cat,
      cost,
      color: getRandomColor(),
      percent: Math.round((cost / total) * 100),
    }
  })
}

const calculateTotalExpense = (expensesList: ExpenseType[]) => {
  return expensesList.reduce((expenseAcc, item) => {
    expenseAcc += Number(item.price)
    return expenseAcc
  }, 0)
}

// export const useStatsSelector = () => {
//   const goals = useAppSelector(state => state.goals.list)
//   const expensesList = useAppSelector(state => state.expenses.list)
//   const total = useAppSelector(state =>
//     state.expenses.list.reduce((expenseAcc, item) => {
//       expenseAcc += Number(item.price)
//       return expenseAcc
//     }, 0),
//   )

//   const calculateTotalPrice = (goalId: string) => {
//     const total = expensesList.reduce((expenseAcc, item) => {
//       if (item.categoryId === goalId) {
//         expenseAcc += Number(item.price)
//       }
//       return expenseAcc
//     }, 0)

//     return {
//       goalId,
//       category: goals.find(goal => goal.id === goalId)?.title,
//       totalPrice: total,
//     }
//   }

//   const stats = goals.map(goal => calculateTotalPrice(goal.id))

//   return {
//     stats,
//     total,
//   }
// }
