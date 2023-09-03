import Button from '../ui/Button'
import GoalItem from './GoalItem'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { Goal } from '../../types/goal'
import { selectGoal } from '../../store/goalsSlice'
import { switchMode } from '../../store/appSlice'
import { GoalViewMode } from '../../types/app.type'

export const GoalList = () => {
  const dispatch = useAppDispatch()
  const goalList = useAppSelector(state => state.goals.list)

  const onSelectGoal = (goal: Goal) => {
    dispatch(selectGoal(goal))
    dispatch(switchMode(GoalViewMode.EDIT_GOAL))
  }

  return (
    <>
      <div className="mb-8 flex justify-end gap-2">
        <Button>Новий ліміт</Button>
        <Button size="huge">Додати витрату</Button>
      </div>
      <div className="flex flex-col">
        <div className="m-auto w-full">
          {goalList.map(item => (
            <GoalItem
              key={item.id}
              iconName={item.iconName}
              period={item.period}
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
