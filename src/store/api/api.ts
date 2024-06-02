import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { getToken, removeToken } from '../../app/utils'
import { logout } from '../userSlice'
import { toInitialApp } from "../appSlice";

const BASE_URL = 'http://localhost:5000'

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/`,
  prepareHeaders: headers => {
    headers.set('Content-Type', 'application/json')
    const token = getToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions = {}) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
    api.dispatch(logout())
    api.dispatch(toInitialApp())

    removeToken()
  }

  return result
}

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: 'splitApi',
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithReauth,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['Auth', 'Categories', 'Expenses', 'User'],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: builder => ({}),
})

// export const enhancedApi = api.enhanceEndpoints({
//   endpoints: () => ({
//     getPost: () => 'test',
//   }),
// })
