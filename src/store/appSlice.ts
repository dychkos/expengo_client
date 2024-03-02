import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryViewMode } from '../app/types/app.type'

export interface AppState {
  appLoading: boolean
  categoryViewMode: CategoryViewMode
  premiumShow: boolean
  settingsOpen: boolean
}

const initialState: AppState = {
  categoryViewMode: CategoryViewMode.CATEGORY_LIST,
  premiumShow: false,
  settingsOpen: false,
  appLoading: true,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchCategoryView: (state, action: PayloadAction<CategoryViewMode>) => {
      state.categoryViewMode = action.payload
    },
    togglePremium: state => {
      state.premiumShow = !state.premiumShow
    },
    toggleSettings: state => {
      state.settingsOpen = !state.settingsOpen
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload
    },
  },
})

export const { setAppLoading, switchCategoryView, togglePremium, toggleSettings } =
  appSlice.actions

export default appSlice.reducer
