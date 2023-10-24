import { ExpenseType } from '../app/types/expense.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import u from 'uniqid'

const tempExpenses: ExpenseType[] = [
  {
    id: u(),
    goalId: 4,
    createdAt: '2023-10-20T14:30:00',
    title: 'Покупки в магазині',
    price: 125,
  },
  {
    id: u(),
    goalId: 2,
    createdAt: '2023-09-20T14:30:00',
    title: 'Нова машина',
    price: 525_000,
  },
  {
    id: u(),
    goalId: 3,
    createdAt: '2023-10-16T14:30:00',
    title: 'Подарунок сестрі',
    price: 800,
  },
  {
    id: u(),
    goalId: 3,
    createdAt: '2023-10-12T14:30:00',
    title: 'Оренда квартири',
    price: 5500,
  },
  {
    id: u(),
    goalId: 1,
    createdAt: '2023-10-12T14:30:00',
    title: 'Похід до ресторану з Діаной',
    price: 2200,
  },
]

export interface ExpensesState {
  list: Array<ExpenseType>
  selected: ExpenseType | null
  error: string | null
  loading: boolean
}

const initialState: ExpensesState = {
  list: tempExpenses,
  error: null,
  loading: false,
  selected: null,
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    createExpense: (state, action: PayloadAction<ExpenseType>) => {
      state.list.push(action.payload)
    },
    updateExpenseInList: (state, action: PayloadAction<ExpenseType>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },
  },
})

export const { createExpense, updateExpenseInList } = expensesSlice.actions

export default expensesSlice.reducer
