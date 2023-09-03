import { GoalViewMode } from '../types/app.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  goalViewMode: GoalViewMode
}

const initialState: AppState = {
  goalViewMode: GoalViewMode.GOAL_LIST,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchMode: (state, action: PayloadAction<GoalViewMode>) => {
      state.goalViewMode = action.payload
    },
  },
})

export const { switchMode } = appSlice.actions

export default appSlice.reducer
