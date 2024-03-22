export interface StatsOptions {
  targetMonth: number
  targetYear: number
  totalValues: boolean
  includeCurrentWeek: boolean
}

export interface PaginatedOutputDto<T> {
  data: T[]
  meta: {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
  }
}
