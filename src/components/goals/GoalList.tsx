import Button from '../ui/Button'
import GoalItem from './GoalItem'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { GoalType } from '../../app/types/goal.type'
import { selectGoal } from '../../store/goalsSlice'
import { switchGoalView } from '../../store/appSlice'
import { GoalViewMode } from '../../app/types/app.type'
import ExpensePopup from '../popups/ExpensePopup'
import { ExpenseType } from '../../app/types/expense.type'
import { createExpense } from '../../store/expensesSlice'

export const GoalList = () => {
  const [showNewExpense, setShowNewExpense] = useState(false)
  const dispatch = useAppDispatch()
  const goalList = useAppSelector(state => state.goals.list)

  const onSelectGoal = (goal: GoalType) => {
    dispatch(selectGoal(goal))
    dispatch(switchGoalView(GoalViewMode.EDIT_GOAL))
  }

  const addExpense = (expense: ExpenseType) => {
    dispatch(createExpense(expense))
    setShowNewExpense(false)
  }

  return (
    <>
      <div className="mb-8 flex justify-end gap-2">
        <Button>Новий ліміт</Button>
        <Button size="huge" onClick={() => setShowNewExpense(true)}>
          Додати витрату
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
        onSaveClick={addExpense}
        isOpened={showNewExpense}
        focusOnShow={true}
        onClose={() => setShowNewExpense(false)}
      />
    </>
  )
}
