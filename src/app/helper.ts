import { TimePeriod } from './types/goal.type'

export const uiTransformPeriod = (period: TimePeriod): string => {
  const periodMap = new Map([
    ['month', 'місяць'],
    ['week', 'тиждень'],
  ])

  return periodMap.has(period) ? periodMap.get(period) ?? '' : ''
}

export const uiTransformDate = (date: string): string => {
  const currentDate = new Date()
  const inputDate = new Date(date)

  const timeDifference = currentDate.getTime() - inputDate.getTime()
  const secondsInMs = 1000
  const minutesInMs = secondsInMs * 60
  const hoursInMs = minutesInMs * 60
  const daysInMs = hoursInMs * 24

  if (timeDifference < minutesInMs) {
    return 'Зараз'
  } else if (timeDifference < 2 * minutesInMs) {
    return '1 хвилину тому'
  } else if (timeDifference < hoursInMs) {
    const minutesAgo = Math.floor(timeDifference / minutesInMs)
    return `${minutesAgo} хвилин тому`
  } else if (timeDifference < 2 * hoursInMs) {
    return '1 годину тому'
  } else if (timeDifference < daysInMs) {
    const hoursAgo = Math.floor(timeDifference / hoursInMs)
    return `${hoursAgo} годин тому`
  } else if (timeDifference < 2 * daysInMs) {
    return 'Вчора'
  } else {
    const daysAgo = Math.floor(timeDifference / daysInMs)
    return `${daysAgo} днів тому`
  }
}
