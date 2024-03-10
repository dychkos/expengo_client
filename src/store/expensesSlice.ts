import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import u from 'uniqid'
import { ExpenseType } from '../app/types/expense.type'

const tempExpenses: ExpenseType[] = [
  {
    id: u(),
    categoryId: '4',
    createdAt: '2024-01-10T14:30:00',
    title: 'Покупки в магазині',
    price: 125,
  },
  {
    id: u(),
    categoryId: '1',
    createdAt: '2024-01-12T14:30:00',
    title: 'Нова машина',
    price: 4377,
  },
  {
    id: u(),
    categoryId: '4',
    createdAt: '2023-10-16T14:30:00',
    title: 'Подарунок сестрі',
    price: 800,
  },
  {
    id: u(),
    categoryId: '4',
    createdAt: '2023-10-12T14:30:00',
    title: 'Оренда квартири',
    price: 5500,
  },
  {
    id: u(),
    categoryId: '4',
    createdAt: '2023-10-12T14:30:00',
    title: 'Похід до ресторану з Діаной',
    price: 2200,
  },
  {
    id: u(),
    categoryId: '4',
    createdAt: '2023-11-16T14:30:00',
    title: 'Похід до ресторану з Діаной',
    price: 2200,
  },
  {
    id: u(),
    categoryId: '4',
    createdAt: '2022-10-12T14:30:00',
    title: 'Жостка тусса',
    price: 2200,
  },
  {
    id: u(),
    categoryId: '4',
    createdAt: '2021-10-12T14:30:00',
    title: 'Вообще давно було',
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
  list: [],
  error: null,
  loading: false,
  selected: null,
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<ExpenseType[]>) => {
      state.list = action.payload
    },
    setExpenseLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setExpenseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    createExpense: (state, action: PayloadAction<ExpenseType>) => {
      state.list.push(action.payload)
    },
    updateExpenseInList: (state, action: PayloadAction<ExpenseType>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },

    removeExpenseInList: (state, action: PayloadAction<ExpenseType>) => {
      state.list.splice(
        state.list.findIndex(item => item.id === action.payload.id),
        1,
      )
    },
  },
})

export const { setExpenses, setExpenseLoading, setExpenseError, createExpense, updateExpenseInList, removeExpenseInList } =
  expensesSlice.actions

export default expensesSlice.reducer
