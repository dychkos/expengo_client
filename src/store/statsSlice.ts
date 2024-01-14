import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatsDiapason } from '../app/types/stats.type'

export interface StatsState {
  targetMonth: number
  targetYear: number
  currentDiapason: StatsDiapason
}

const initialState: StatsState = {
  targetMonth: new Date(Date.now()).getMonth(),
  targetYear: new Date(Date.now()).getFullYear(),
  currentDiapason: 'month'
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    switchDiapason: (state, action: PayloadAction<StatsDiapason>) => {
      state.currentDiapason = action.payload
    },
    setupStatsDate: (state, action: PayloadAction<{month: number, year: number}>) => {
      state.targetMonth = action.payload.month;
      state.targetYear = action.payload.year;
    }
  },
})

export const { switchDiapason, setupStatsDate } = statsSlice.actions

export default statsSlice.reducer
