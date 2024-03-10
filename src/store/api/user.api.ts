import { UserType } from '../../app/types/user.type'
import { setAppLoading } from '../appSlice'
import { setAuthorized, setUser } from '../userSlice'
import { categoriesApi } from './categories.api'
import { expensesApi } from './expenses.api'
import { api } from './api'

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    startSession: builder.query<UserType, {} | null>({
      query() {
        return {
          url: 'users/me',
        }
      },
      providesTags: (result, error, id) => [{ type: 'User' }],
      extraOptions: { maxRetries: 1 },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setAppLoading(true))
        try {
          const { data } = await queryFulfilled

          dispatch(setUser(data))
          dispatch(setAuthorized(true))

          await dispatch(categoriesApi.endpoints.getCategories.initiate(null))
          await dispatch(expensesApi.endpoints.getExpenses.initiate(null))

        } catch (error) {
          dispatch(setUser(null))
          dispatch(setAuthorized(false))

        } finally {
          dispatch(setAppLoading(false))
        }
      },
    }),
  }),
})

export const { useStartSessionQuery } = userApi
