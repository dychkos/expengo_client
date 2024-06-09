import u from 'uniqid'
import { getRandomColor } from '../helper'

export interface CategoryType {
  id: string
  iconName: string
  period: TimePeriod
  title: string
  limit: number
  color: string
  uncategorized: boolean
  createdAt: string
  volume: ExpenseVolume
}

export interface ExpenseVolume {
  month: number
  week: number
}

export type TimePeriod = 'month' | 'week'

export const getDefaultCategory = (): CategoryType => ({
  id: u(),
  iconName: 'AiOutlineCar', // replace by default Icon
  title: '',
  period: 'month',
  limit: 250,
  color: getRandomColor(),
  uncategorized: false,
  createdAt: new Date(Date.now()).toISOString(),
  volume: {
    week: 0,
    month: 0,
  },
})
