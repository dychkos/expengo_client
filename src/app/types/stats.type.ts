import { CategoryType } from './category.type'

export type StatsDiapason = 'month' | 'week' | 'year'

export interface StatsItem {
	category: CategoryType
	cost: number
	percent: number
}