export enum CategoryViewMode {
  EDIT_CATEGORY = 'category_in_edit',
  CREATE_CATEGORY = 'category_in_create',
  CATEGORY_LIST = 'category_list',
}

export interface StatsOptions {
  targetMonth: number
  targetYear: number
  totalValues: boolean
  includeCurrentWeek: boolean
}
