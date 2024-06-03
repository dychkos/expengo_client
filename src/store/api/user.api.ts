import { UserType } from '../../app/types/user.type'
import { setAppLoading } from '../appSlice'
import { setAuthorized, setUser } from '../userSlice'
import { categoriesApi } from './categories.api'
import { expensesApi } from './expenses.api'
import { api } from './api'
import { EXPENSES_PER_PAGE } from '../../app/types/expense.type'

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
        } catch (error) {
          dispatch(setUser(null))
          dispatch(setAuthorized(false))
        } finally {
          dispatch(setAppLoading(false))
        }
      },
    }),

    updateUser: builder.mutation<UserType, Partial<UserType>>({
      query(data) {
        return {
          url: 'users/me',
          method: 'PATCH',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        dispatch(setUser(data))
      },
    }),
  }),
})

export const { useStartSessionQuery, useUpdateUserMutation } = userApi
