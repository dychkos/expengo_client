import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConfigState {
  weekStartDay: number // 0 - 6
}

const initialState: ConfigState = {
  weekStartDay: 0,
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setWeekStartDay: (state, action: PayloadAction<number>) => {
      state.weekStartDay = action.payload
    },
  },
})

export const { setWeekStartDay } = configSlice.actions

export default configSlice.reducer
