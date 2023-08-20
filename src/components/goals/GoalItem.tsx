import React, { FC } from 'react'
import { Icon } from '../Icon'
import clsx from 'clsx'

export interface GoalItemProps {
  iconName: string
  category: string
  period: 'week' | 'month'
  limit: number
  current: number
}

const GoalItem: FC<GoalItemProps> = ({
  iconName,
  category,
  period,
  current,
  limit,
}) => {
  const progressPercent = (current / limit) * 100

  const calcProgressColor = (percent: number) => {
    if (percent <= 30) {
      return 'bg-success'
    } else if (percent <= 75) {
      return 'bg-warning'
    } else {
      return 'bg-danger'
    }
  }

  const ProgressBarClasses = clsx(
    `absolute top-0 h-10 rounded-r-lg ${calcProgressColor(progressPercent)}`,
  )

  const ProgressStyle = {
    width: progressPercent + '%',
  }

  return (
    <div className="py-3 px-2 bg-transparent cursor-pointer hover:bg-slate-100 rounded-xl transition-all">
      <div className="flex justify-between mb-1">
        <div className="font-default text-base">{category}</div>
        <div className="font-default text-right text-base">
          {period === 'week' ? 'на тиждень' : 'на місяць'}
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary">
          <Icon nameIcon={iconName} propsIcon={{ size: '36px' }} />
        </div>
        <div className="w-full relative">
          <div className="font-default z-10 text-white font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {current} / {limit}
          </div>
          <div className="h-10 align-middle w-full rounded-r-lg bg-slate-300"></div>
          <div className={ProgressBarClasses} style={ProgressStyle}></div>
        </div>
      </div>
    </div>
  )
}

export default GoalItem
