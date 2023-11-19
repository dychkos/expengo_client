import Button from '../ui/Button'
import GoalItem from './GoalItem'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { GoalType } from '../../app/types/goal.type'
import { selectGoal } from '../../store/goalsSlice'
import { switchGoalView } from '../../store/appSlice'
import { GoalViewMode } from '../../app/types/app.type'
import ExpensePopup from '../popups/ExpensePopup'
import { useExpense } from '../../hooks/useExpense'

export const GoalList = () => {
  const { add, isEditing, toggleEditing } = useExpense()

  const dispatch = useAppDispatch()
  const goalList = useAppSelector(state => state.goals.list)

  const onSelectGoal = (goal: GoalType) => {
    dispatch(selectGoal(goal))
    dispatch(switchGoalView(GoalViewMode.EDIT_GOAL))
  }

  const addGoal = () => {
    dispatch(switchGoalView(GoalViewMode.CREATE_GOAL))
  }

  return (
    <>
      <div className="mb-8 flex justify-end gap-2">
        <Button icon="AiOutlinePlusCircle" onClick={toggleEditing}>
          Додати витрату
        </Button>
        <Button variant="outline" onClick={addGoal}>
          Новий ліміт
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="m-auto w-full">
          {goalList.map(item => (
            <GoalItem key={item.id} onSelect={() => onSelectGoal(item)} {...item} />
          ))}
        </div>
      </div>
      <ExpensePopup
        onSaveClick={add}
        isOpened={isEditing}
        focusOnShow={true}
        onClose={toggleEditing}
      />
    </>
  )
}
