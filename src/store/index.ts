import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import AppReducer from './appSlice'
import AuthReducer from './authSlice'
import CategoriesReducer from './categoriesSlice'
import ConfigReducer from './configSlice'
import ExpensesReducer from './expensesSlice'
import StatsReducer from './statsSlice'

const store = configureStore({
  reducer: {
    app: AppReducer,
    config: ConfigReducer,
    categories: CategoriesReducer,
    expenses: ExpensesReducer,
    stats: StatsReducer,
    auth: AuthReducer,

    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export default store
