import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import u from 'uniqid'
import { CategoryType } from '../app/types/category.type'

export interface CategoriesState {
  list: Array<CategoryType>
  selected: CategoryType | null
  error: string | null
  loading: boolean | null
}
const mockCategories: CategoryType[] = [
  {
    id: '1',
    iconName: 'AiOutlineGift',
    period: 'month',
    title: 'Подарунки',
    limit: 12_000,
    createdAt: '2023-10-20T14:30:00',
  },
  {
    id: '4',
    iconName: 'AiOutlineHome',
    title: 'Дім2',
    period: 'week',
    limit: 8_000,
    createdAt: '2023-10-20T14:30:00',
  },
  {
    id: u(),
    iconName: 'AiOutlineInbox',
    title: 'Підписки',
    period: 'month',
    limit: 2_000,
    createdAt: '2023-10-20T14:30:00',
  },
  {
    id: u(),
    iconName: 'AiOutlineCar',
    title: 'Транспорт',
    period: 'week',
    limit: 4_500,
    createdAt: '2023-10-20T14:30:00',
  },
]

const initialState: CategoriesState = {
  list: mockCategories,
  selected: null,
  error: null,
  loading: null,
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<CategoryType | null>) => {
      state.selected = action.payload
    },
    updateCategoryInList: (state, action: PayloadAction<CategoryType>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },
    createCategory: (state, action: PayloadAction<CategoryType>) => {
      state.list.push(action.payload)
    },
  },
})

export const { selectCategory, updateCategoryInList, createCategory } =
  categorySlice.actions
export default categorySlice.reducer
