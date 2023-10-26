import u from 'uniqid'

export interface ExpenseType {
  id: string
  goalId: string
  title: string
  price: number
  createdAt: string
}

export const defaultExpense: ExpenseType = {
  id: u(),
  goalId: '',
  title: 'Нова витрата',
  price: 0,
  createdAt: new Date(Date.now()).toISOString(),
}
