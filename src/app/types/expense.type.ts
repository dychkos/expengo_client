import u from 'uniqid'
import { PaginatedOutputDto } from './app.type'

export interface ExpenseType {
  id: string
  categoryId: string
  title: string
  price: number
  createdAt: string
}

export interface ExpenseRequest {
  perPage: number
  page: number
}

export interface ExpensesPaginated extends PaginatedOutputDto<ExpenseType> {}

export const EXPENSES_PER_PAGE = 40

export const getDefaultExpense = (): ExpenseType => ({
  id: u(),
  categoryId: '',
  title: 'Нова витрата',
  price: 0,
  createdAt: new Date(Date.now()).toISOString(),
})
