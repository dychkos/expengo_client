import React, { FC } from 'react'
import GoalProgress from '../GoalProgress'
import { useExpensesByGoal } from '../../hooks'

export interface GoalItemProps {
  id: number
  iconName: string
  category: string
  period: 'week' | 'month'
  limit: number
  onSelect: Function
}

const GoalItem: FC<GoalItemProps> = ({
  id,
  iconName,
  category,
  period,
  limit,
  onSelect,
}) => {
  const currentlyExpended = useExpensesByGoal(id)

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
        <GoalProgress current={currentlyExpended} limit={limit} icon={iconName} />
      </div>
    </div>
  )
}

export default GoalItem
