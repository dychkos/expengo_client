import React from 'react'
import GoalItem, { GoalItemProps } from '../components/goals/GoalItem'

const Goals = () => {
  return (
    <div className="flex flex-col">
      <div className="h-1/3">buttons</div>

      <div className="m-auto overflow-y-auto grow sm:w-3/4 md:w-2/4">
        {mockGoals.map(item => (
          <GoalItem
            iconName={item.iconName}
            period={item.period}
            category={item.category}
            limit={item.limit}
            current={item.current}
          />
        ))}
      </div>
    </div>
  )
}

const mockGoals: GoalItemProps[] = [
  {
    iconName: 'AiOutlineGift',
    period: 'month',
    category: 'Подарунки',
    limit: 12_000,
    current: 1_000,
  },
  {
    iconName: 'AiOutlineHome',
    category: 'Дім',
    period: 'week',
    limit: 8_000,
    current: 4_900,
  },
  {
    iconName: 'AiOutlineInbox',
    category: 'Підписки',
    period: 'month',
    limit: 2_000,
    current: 1_900,
  },
  {
    iconName: 'AiOutlineCar',
    category: 'Транспорт',
    period: 'week',
    limit: 4_500,
    current: 900,
  },
  {
    iconName: 'AiOutlineCar',
    category: 'Транспорт',
    period: 'week',
    limit: 4_500,
    current: 900,
  },
  {
    iconName: 'AiOutlineCar',
    category: 'Транспорт',
    period: 'week',
    limit: 4_500,
    current: 900,
  },
]

export default Goals
