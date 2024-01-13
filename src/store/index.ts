import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import AppReducer from './appSlice'
import CategoriesReducer from './categoriesSlice'
import ConfigReducer from './configSlice'
import ExpensesReducer from './expensesSlice'

const store = configureStore({
  reducer: {
    app: AppReducer,
    config: ConfigReducer,
    categories: CategoriesReducer,
    expenses: ExpensesReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export default store
