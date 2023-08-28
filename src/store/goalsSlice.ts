import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Goal } from '../types/goal'

export interface GoalsState {
  list: Array<Goal>
  selected: Goal | null
  error: string | null
  loading: boolean | null
}

const initialState: GoalsState = {
  list: [],
  selected: null,
  error: null,
  loading: null,
}

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    selectGoal: (state, action: PayloadAction<Goal | null>) => {
      state.selected = action.payload
    },
  },
})

export const { selectGoal } = goalsSlice.actions
export default goalsSlice.reducer
