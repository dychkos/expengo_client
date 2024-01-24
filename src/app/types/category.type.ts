import u from 'uniqid'
import { getRandomColor } from '../helper'

export interface CategoryType {
  id: string
  iconName: string
  period: TimePeriod
  title: string
  limit: number 
  color: string
  // about?: string
  createdAt: string
}

export type TimePeriod = 'month' | 'week' 

export const getDefaultCategory = (): CategoryType => ({
  id: u(),
  iconName: 'AiOutlineCar', // replace by default Icon
  title: '',
  period: 'month',
  limit: 250,
  color: getRandomColor(),
  createdAt: new Date(Date.now()).toISOString(),
})
