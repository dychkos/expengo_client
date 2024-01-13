import { CategoryViewMode } from '../app/types/app.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  categoryViewMode: CategoryViewMode
  premiumShow: boolean
  settingsOpen: boolean
}

const initialState: AppState = {
  categoryViewMode: CategoryViewMode.CATEGORY_LIST,
  premiumShow: false,
  settingsOpen: false,
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
  },
})

export const { switchCategoryView, togglePremium, toggleSettings } = appSlice.actions

export default appSlice.reducer
