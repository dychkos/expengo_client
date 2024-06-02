import {
  ExpenseRequest,
  ExpensesPaginated,
  ExpenseType,
} from '../../app/types/expense.type'
import {
  createExpense,
  removeExpenseInList,
  setExpenseError,
  setExpenseLoading,
  setExpenses,
} from '../expensesSlice'
import { api } from './api'

export const expensesApi = api.injectEndpoints({
  endpoints: builder => ({
    getExpenses: builder.query<ExpensesPaginated, ExpenseRequest>({
      providesTags: ['Expenses'],

      query({ page, perPage }: ExpenseRequest) {
        return {
          url: `expenses?page=${page}&perPage=${perPage}`,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: expenses } = (await queryFulfilled).data
          dispatch(setExpenses(expenses))
        } catch (error) {}
      },
    }),
    storeExpense: builder.mutation<ExpenseType, ExpenseType>({
      query(data) {
        return {
          url: 'expenses',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['Categories'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setExpenseLoading(true))

          const { data } = await queryFulfilled

          dispatch(createExpense(data))
          // dispatch(categoriesApi.endpoints.getCategories.initiate(null))
        } catch (e) {
          dispatch(setExpenseError('Не вдалось додати витрату'))
        } finally {
          dispatch(setExpenseLoading(false))
        }
      },
    }),
    destroyExpense: builder.mutation<ExpenseType, ExpenseType>({
      query({ id, ...data }) {
        return {
          url: `expenses/${id}`,
          method: 'DELETE',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setExpenseLoading(true))

          const { data } = await queryFulfilled

          dispatch(removeExpenseInList(data))
        } catch (e) {
          dispatch(setExpenseError('Не вдалось видалити витрату'))
        } finally {
          dispatch(setExpenseLoading(false))
        }
      },
    }),
  }),
})

export const { useGetExpensesQuery, useDestroyExpenseMutation, useStoreExpenseMutation } =
  expensesApi
