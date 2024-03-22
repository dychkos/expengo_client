import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  appLoading: boolean

  premiumShow: boolean
  updatePassword: boolean
  updateUserInfo: boolean
  addingExpense: boolean
  addingCategory: boolean
  settingsOpen: boolean
}

const initialState: AppState = {
  premiumShow: false,
  settingsOpen: false,
  updatePassword: false,
  updateUserInfo: false,
  appLoading: false,
  addingExpense: false,
  addingCategory: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    togglePremium: state => {
      state.premiumShow = !state.premiumShow
    },
    toggleSettings: state => {
      state.settingsOpen = !state.settingsOpen
    },
    toggleAddingExpense: state => {
      state.addingExpense = !state.addingExpense
    },
    toggleAddingCategory: state => {
      state.addingCategory = !state.addingCategory
    },
    toggleUpdatePassword: state => {
      state.updatePassword = !state.updatePassword
    },
    toggleUpdateUserInfo: state => {
      state.updateUserInfo = !state.updateUserInfo
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload
    },
    toInitialApp: () => {
      return initialState
    },
  },
})

export const {
  setAppLoading,
  togglePremium,
  toggleSettings,
  toggleAddingExpense,
  toggleAddingCategory,
  toggleUpdatePassword,
  toggleUpdateUserInfo,
  toInitialApp,
} = appSlice.actions

export default appSlice.reducer
