import { TimePeriod } from './types/goal'

export const uiTransformPeriod = (period: TimePeriod): string => {
  const periodMap = new Map([
    ['month', 'місяць'],
    ['week', 'тиждень'],
  ])

  return periodMap.has(period) ? periodMap.get(period) ?? '' : ''
}
