import u from 'uniqid'

export interface CategoryType {
  id: string
  iconName: string
  period: TimePeriod
  title: string
  limit: number 
  about?: string
  createdAt: string
}

export type TimePeriod = 'month' | 'week' 

export const getDefaultCategory = (): CategoryType => ({
  id: u(),
  iconName: 'AiOutlineCar', // replace by default Icon
  title: '',
  period: 'month',
  limit: 250,
  createdAt: new Date(Date.now()).toISOString(),
})
