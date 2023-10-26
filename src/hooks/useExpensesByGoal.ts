import { useAppSelector } from '../store'

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
