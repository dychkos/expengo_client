import { setToken } from '../../app/utils'
import { api } from './api'
import { userApi } from './user.api'

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.mutation<{ accessToken: string }, any>({
      query(data) {
        return {
          url: 'auth/register',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setToken(data.accessToken)
          
          await dispatch(
            userApi.endpoints.startSession.initiate(null, {
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
          url: 'auth/login',
          method: 'POST',
          body: data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setToken(data.accessToken)
 
          await dispatch(
            userApi.endpoints.startSession.initiate(null, {
              subscribe: false,
              forceRefetch: true,
            }),
          )
        } catch (error) {}
      },
    }),
  }),
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi
