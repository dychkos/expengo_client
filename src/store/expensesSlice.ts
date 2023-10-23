import { ExpenseType } from '../app/types/expense.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const tempExpenses: ExpenseType[] = [
  {
    id: 1,
    iconName: 'AiFillShopping',
    createdAt: '2023-10-20T14:30:00',
    title: 'Покупки в магазині',
    price: 125,
  },
  {
    id: 2,
    iconName: 'AiOutlineCar',
    createdAt: '2023-09-20T14:30:00',
    title: 'Нова машина',
    price: 525_000,
  },
  {
    id: 3,
    iconName: 'AiOutlineGift',
    createdAt: '2023-10-16T14:30:00',
    title: 'Подарунок сестрі',
    price: 800,
  },
  {
    id: 4,
    iconName: 'AiFillHome',
    createdAt: '2023-10-12T14:30:00',
    title: 'Оренда квартири',
    price: 5500,
  },
  {
    id: 5,
    iconName: 'FaPizzaSlice',
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
    selectExpense: (state, action: PayloadAction<ExpenseType | null>) => {
      state.selected = action.payload
    },
    editSelectedExpense: (state, action: PayloadAction<ExpenseType>) => {
      state.selected = { ...state.selected, ...action.payload }
    },
    updateExpenseInList: (state, action: PayloadAction<ExpenseType>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },
  },
})

export const { selectExpense, editSelectedExpense, updateExpenseInList } =
  expensesSlice.actions

export default expensesSlice.reducer
