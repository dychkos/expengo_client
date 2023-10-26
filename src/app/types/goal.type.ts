import u from 'uniqid'

export interface GoalType {
  id: string
  iconName: string
  period: TimePeriod
  category: string
  limit: number
  about?: string
  createdAt: string
}

export type TimePeriod = 'month' | 'week'

export const defaultGoal: GoalType = {
  id: u(),
  iconName: 'AiOutlineCar', // replace by default Icon
  category: '',
  period: 'month',
  limit: 250,
  createdAt: new Date(Date.now()).toISOString(),
}
