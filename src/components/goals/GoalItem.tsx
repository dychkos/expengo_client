import React, { FC } from 'react'
import GoalProgress from '../GoalProgress'

export interface GoalItemProps {
  iconName: string
  category: string
  period: 'week' | 'month'
  limit: number
  current: number
  onSelect: Function
}

const GoalItem: FC<GoalItemProps> = ({
  iconName,
  category,
  period,
  current,
  limit,
  onSelect,
}) => {
  return (
    <div
      className="py-3 px-2 bg-transparent cursor-pointer hover:bg-slate-100 rounded-xl transition-all"
      onClick={() => onSelect()}
    >
      <div className="flex justify-between mb-1">
        <div className="font-default text-base">{category}</div>
        <div className="font-default text-right text-base">
          {period === 'week' ? 'на тиждень' : 'на місяць'}
        </div>
      </div>

      <div className="flex items-center">
        <GoalProgress current={current} limit={limit} icon={iconName} />
      </div>
    </div>
  )
}

export default GoalItem
