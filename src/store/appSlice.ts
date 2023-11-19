import { GoalViewMode } from '../app/types/app.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  goalViewMode: GoalViewMode
  premiumShow: boolean
  settingsOpen: boolean
}

const initialState: AppState = {
  goalViewMode: GoalViewMode.GOAL_LIST,
  premiumShow: false,
  settingsOpen: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchGoalView: (state, action: PayloadAction<GoalViewMode>) => {
      state.goalViewMode = action.payload
    },
    togglePremium: state => {
      state.premiumShow = !state.premiumShow
    },
    toggleSettings: state => {
      state.settingsOpen = !state.settingsOpen
    },
  },
})

export const { switchGoalView, togglePremium, toggleSettings } = appSlice.actions

export default appSlice.reducer
