import u from 'uniqid'

export interface ExpenseType {
  id: string
  goalId: number
  title: string
  price: number
  createdAt: string
}

export const defaultExpense: ExpenseType = {
  id: u(),
  goalId: 1,
  title: 'Нова витрата',
  price: 0,
  createdAt: new Date(Date.now()).toISOString(),
}
