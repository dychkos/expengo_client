import { TimePeriod } from './types/goal'

export const uiTransformPeriod = (period: TimePeriod) => {
  const periodMap = new Map([
    ['month', 'місяць'],
    ['week', 'тиждень'],
  ])

  return periodMap.has(period) ? periodMap.get(period) : null
}
