import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { StatsDiapason } from '../app/types/stats.type'
import type { RootState } from './index'

export interface StatsState {
  targetMonth: number
  targetYear: number
  currentDiapason: StatsDiapason
  openedCategory?: string
}

const initialState: StatsState = {
  targetMonth: new Date(Date.now()).getMonth(),
  targetYear: new Date(Date.now()).getFullYear(),
  currentDiapason: 'month',
  openedCategory: undefined,
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    switchDiapason: (state, action: PayloadAction<StatsDiapason>) => {
      state.currentDiapason = action.payload
    },
    setupStatsDate: (state, action: PayloadAction<{ month: number; year: number }>) => {
      state.targetMonth = action.payload.month
      state.targetYear = action.payload.year
    },
    openCategory: (state, action: PayloadAction<string>) => {
      state.openedCategory = action.payload
    },
  },
})

const diapasonSelector = (state: RootState) => state.stats.currentDiapason
const targetMonthSelector = (state: RootState) => state.stats.targetMonth
const targetYearSelector = (state: RootState) => state.stats.targetYear

export const diapasonTargetSelector = createSelector(
  [diapasonSelector, targetMonthSelector, targetYearSelector],
  (currentDiapason, targetMonth, targetYear) => ({
    diapason: currentDiapason,
    targetMonth,
    targetYear,
  }),
)

export const { switchDiapason, setupStatsDate, openCategory } = statsSlice.actions

export default statsSlice.reducer
