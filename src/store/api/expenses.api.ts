import { ExpenseType } from '../../app/types/expense.type'
import { setExpenses } from '../expensesSlice'
import { api } from './api'


export const expensesApi = api.injectEndpoints({
  endpoints: builder => ({
    getExpenses: builder.query<ExpenseType[], null>({
      query() {
        return {
          url: 'expenses',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setExpenses(data))
        } catch (error) {}
      },
    }),
  }),
})

export const { useGetExpensesQuery } = expensesApi
