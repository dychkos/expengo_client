import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, setToken } from '../../app/utils'
import { userApi } from './userApi'

// const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;
const BASE_URL = 'http://localhost:5000'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth/`,
    // credentials: 'same-origin',

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
  endpoints: builder => ({
    registerUser: builder.mutation<{ accessToken: string }, any>({
      query(data) {
        return {
          url: 'register',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setToken(data.accessToken)
          await dispatch(
            userApi.endpoints.getMe.initiate(null, {
              subscribe: false,
              forceRefetch: true,
            }),
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    loginUser: builder.mutation<{ accessToken: string }, any>({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          // credentials: 'include',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setToken(data.accessToken)
          console.log('hwerwe')
          await dispatch(
            userApi.endpoints.getMe.initiate(null, {
              subscribe: false,
              forceRefetch: true,
            }),
          )
        } catch (error) {}
      },
    }),
    // logoutUser: builder.mutation<void, void>({
    //   query() {
    //     return {
    //       url: 'logout',
    //       credentials: 'include',
    //     }
    //   },
    // }),
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi
