import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../app/types/user.type'

interface UserState {
  userInfo: UserType | null
  accessToken: string
  isAuthorized: boolean

  loading: boolean
  error: null | string
}

const initialState: UserState = {
  userInfo: null,
  accessToken: '',
  isAuthorized: false,

  loading: false,
  error: null,
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.userInfo = action.payload
    },
    setAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export default userSlice.reducer

export const { logout, setUser, setAuthorized, setUserLoading, setUserError } =
  userSlice.actions
