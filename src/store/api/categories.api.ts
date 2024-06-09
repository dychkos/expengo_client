import { CategoryType } from '../../app/types/category.type'
import {
  createCategory,
  setCategories,
  setCategoryError,
  setCategoryLoading,
} from '../categoriesSlice'
import { api } from './api'

export const categoriesApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<CategoryType[], null>({
      providesTags: ['Categories'],
      query() {
        return {
          url: 'categories',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCategories(data))
        } catch (error) {}
      },
    }),
    storeCategory: builder.mutation<CategoryType, CategoryType>({
      invalidatesTags: ['Categories'],
      query(data) {
        return {
          url: 'categories',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setCategoryLoading(true))

          const { data } = await queryFulfilled

          dispatch(createCategory({ ...data, volume: { week: 0, month: 0 } }))
        } catch (e) {
          dispatch(setCategoryError('Не вдалось додати витрату'))
        } finally {
          dispatch(setCategoryLoading(false))
        }
      },
    }),
    editCategory: builder.mutation<CategoryType, CategoryType>({
      invalidatesTags: ['Categories'],
      query({id,  ...data }) {
        return {
          url: `categories/${id}`,
          method: 'PUT',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setCategoryLoading(true))

          const { data } = await queryFulfilled

          // dispatch(createCategory({ ...data, volume: { week: 0, month: 0 } }))
        } catch (e) {
          dispatch(setCategoryError('Не вдалось додати витрату'))
        } finally {
          dispatch(setCategoryLoading(false))
        }
      },
    }),
    destroyCategory: builder.mutation<CategoryType, CategoryType>({
      invalidatesTags: ['Categories'],
      query({id,  ...data }) {
        return {
          url: `categories/${id}`,
          method: 'DELETE',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          dispatch(setCategoryLoading(true))

          const { data } = await queryFulfilled

          // dispatch(createCategory({ ...data, volume: { week: 0, month: 0 } }))
        } catch (e) {
          dispatch(setCategoryError('Не вдалось додати витрату'))
        } finally {
          dispatch(setCategoryLoading(false))
        }
      },
    }),
  }),
})

export const { useGetCategoriesQuery, useStoreCategoryMutation, useEditCategoryMutation, useDestroyCategoryMutation } = categoriesApi
