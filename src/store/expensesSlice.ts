import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExpenseType } from '../app/types/expense.type'

export interface ExpensesState {
  list: Array<ExpenseType>
  selected: ExpenseType | null
  error: string | null
  loading: boolean
  viewedPage: number
}

const initialState: ExpensesState = {
  list: [],
  error: null,
  loading: false,
  selected: null,
  viewedPage: 1,
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<ExpenseType[]>) => {
      state.list = action.payload
    },
    appendExpenses: (state, action: PayloadAction<ExpenseType[]>) => {
      state.list = [...state.list, ...action.payload]
    },
    setExpenseLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setExpenseError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    createExpense: (state, action: PayloadAction<ExpenseType>) => {
      state.list.unshift(action.payload)
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
    setExpensesPage: (state, action: PayloadAction<number>) => {
      state.viewedPage = action.payload
    },
  },
})

export const {
  setExpenses,
  appendExpenses,
  setExpensesPage,
  setExpenseLoading,
  setExpenseError,
  createExpense,
  updateExpenseInList,
  removeExpenseInList,
} = expensesSlice.actions

export default expensesSlice.reducer
