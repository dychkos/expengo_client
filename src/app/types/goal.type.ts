export interface GoalType {
  id: number
  iconName: string
  period: TimePeriod
  category: string
  limit: number
  about?: string
  createdAt?: string
}

export type TimePeriod = 'month' | 'week'
