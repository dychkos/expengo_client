import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserType } from '../../app/types/user.type'
import { getToken } from '../../app/utils'
import { setAuthorized, setUser } from '../authSlice'

// const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;
const BASE_URL = 'http://localhost:5000'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/users/`,
    // mode: 'no-cors',
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json')
      const token = getToken()

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getMe: builder.query<UserType, null>({
      query() {
        return {
          url: 'me',
          // credentials: 'include',
        }
      },
      // transformResponse: (result: { data: UserType }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log('user', data)
          dispatch(setUser(data))
          dispatch(setAuthorized(true))
        } catch (error) {}
      },
    }),
  }),
})

export const { useGetMeQuery } = userApi
