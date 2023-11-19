import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import GoalsReducer from './goalsSlice'
import ExpensesReducer from './expensesSlice'
import ConfigReducer from './configSlice'
import AppReducer from './appSlice'

const store = configureStore({
  reducer: {
    app: AppReducer,
    config: ConfigReducer,
    goals: GoalsReducer,
    expenses: ExpensesReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export default store
