import { useAppSelector } from '../store'

export const useExpensesByGoal = (goalId: number) => {
  return useAppSelector(state =>
    state.expenses.list.reduce((acc, item) => {
      if (item.goalId === goalId) {
        acc += item.price
      }
      return acc
    }, 0),
  )
}
