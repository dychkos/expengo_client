import { GoalViewMode } from '../app/types/app.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  goalViewMode: GoalViewMode
  premiumShow: boolean
}

const initialState: AppState = {
  goalViewMode: GoalViewMode.GOAL_LIST,
  premiumShow: false,
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
  },
})

export const { switchGoalView, togglePremium } = appSlice.actions

export default appSlice.reducer
