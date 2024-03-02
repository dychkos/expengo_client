import { CategoryType } from '../../app/types/category.type'
import { setCategories } from '../categoriesSlice'
import { api } from './api'

export const categoriesApi = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<CategoryType[], null>({
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
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
