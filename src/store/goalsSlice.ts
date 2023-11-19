import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GoalType } from '../app/types/goal.type'
import u from 'uniqid'

export interface GoalsState {
  list: Array<GoalType>
  selected: GoalType | null
  error: string | null
  loading: boolean | null
}
const mockGoals: GoalType[] = [
  {
    id: u(),
    iconName: 'AiOutlineGift',
    period: 'month',
    category: 'Подарунки',
    limit: 12_000,
    createdAt: '2023-10-20T14:30:00',
  },
  {
    id: '4',
    iconName: 'AiOutlineHome',
    category: 'Дім2',
    period: 'week',
    limit: 8_000,
    createdAt: '2023-10-20T14:30:00',
  },
  {
    id: u(),
    iconName: 'AiOutlineInbox',
    category: 'Підписки',
    period: 'month',
    limit: 2_000,
    createdAt: '2023-10-20T14:30:00',
  },
  {
    id: u(),
    iconName: 'AiOutlineCar',
    category: 'Транспорт',
    period: 'week',
    limit: 4_500,
    createdAt: '2023-10-20T14:30:00',
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
    selectGoal: (state, action: PayloadAction<GoalType | null>) => {
      state.selected = action.payload
    },
    editSelectedGoal: (state, action: PayloadAction<GoalType>) => {
      state.selected = { ...state.selected, ...action.payload }
    },
    updateGoalInList: (state, action: PayloadAction<GoalType>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },
    createGoal: (state, action: PayloadAction<GoalType>) => {
      state.list.push(action.payload)
    },
  },
})

export const { selectGoal, updateGoalInList, editSelectedGoal, createGoal } =
  goalsSlice.actions
export default goalsSlice.reducer
