import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Goal } from '../types/goal'

export interface GoalsState {
  list: Array<Goal>
  selected: Goal | null
  error: string | null
  loading: boolean | null
}
const mockGoals: Goal[] = [
  {
    id: 1,
    iconName: 'AiOutlineGift',
    period: 'month',
    category: 'Подарунки',
    limit: 12_000,
    current: 1_000,
  },
  {
    id: 2,
    iconName: 'AiOutlineHome',
    category: 'Дім',
    period: 'week',
    limit: 8_000,
    current: 4_900,
  },
  {
    id: 3,
    iconName: 'AiOutlineInbox',
    category: 'Підписки',
    period: 'month',
    limit: 2_000,
    current: 1_900,
  },
  {
    id: 4,
    iconName: 'AiOutlineCar',
    category: 'Транспорт',
    period: 'week',
    limit: 4_500,
    current: 900,
  },
  {
    id: 5,
    iconName: 'AiOutlineCar',
    category: 'Транспорт',
    period: 'week',
    limit: 4_500,
    current: 900,
  },
  {
    id: 6,
    iconName: 'AiOutlineCar',
    category: 'Транспорт',
    period: 'week',
    limit: 4_500,
    current: 900,
  },
]

const initialState: GoalsState = {
  list: mockGoals,
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
    editSelectedGoal: (state, action: PayloadAction<Goal>) => {
      state.selected = { ...state.selected, ...action.payload }
    },
    updateGoalInList: (state, action: PayloadAction<Goal>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },
  },
})

export const { selectGoal, updateGoalInList, editSelectedGoal } =
  goalsSlice.actions
export default goalsSlice.reducer
