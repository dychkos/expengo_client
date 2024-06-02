import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryType } from '../app/types/category.type'

export interface CategoriesState {
  list: Array<CategoryType>
  selected: CategoryType | null
  error: string | null
  loading: boolean | null
}

const initialState: CategoriesState = {
  list: [],
  selected: null,
  error: null,
  loading: null,
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.list = action.payload
    },
    setCategoryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setCategoryError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
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

export const {
  setCategories,
  setCategoryLoading,
  setCategoryError,
  selectCategory,
  updateCategoryInList,
  createCategory,
} = categorySlice.actions
export default categorySlice.reducer
