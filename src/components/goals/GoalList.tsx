import Button from '../ui/Button'
import GoalItem from './GoalItem'
import React from 'react'
import { useAppDispatch } from '../../store'
import { Goal } from '../../types/goal'
import { selectGoal } from '../../store/goalsSlice'

export const GoalList = () => {
  const dispatch = useAppDispatch()

  const onSelectGoal = (goal: Goal) => {
    dispatch(selectGoal(goal))
  }

  return (
    <>
      <div className="mb-8 flex justify-end gap-2">
        <Button>Новий ліміт</Button>
        <Button size="huge">Додати витрату</Button>
      </div>
      <div className="flex flex-col">
        <div className="m-auto w-full">
          {mockGoals.map((item, id) => (
            <GoalItem
              key={id}
              iconName={item.iconName}
              period={'month'}
              category={item.category}
              limit={item.limit}
              current={item.current}
              onSelect={() => onSelectGoal(item)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

const mockGoals = [
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
