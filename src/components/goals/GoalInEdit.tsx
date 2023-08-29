import React, { useCallback } from 'react'
import { Goal, TimePeriod } from '../../types/goal'
import { Icon } from '../Icon'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  editSelectedGoal,
  selectGoal,
  updateGoalInList,
} from '../../store/goalsSlice'
import EditableField, { EditableFieldOptions } from '../ui/EditableField'
import GoalProgress from '../GoalProgress'
import { uiTransformPeriod } from '../../helper'

interface EditGoalProps {
  goal: Goal
}

const GoalInEdit: React.FC<EditGoalProps> = ({ goal }) => {
  const dispatch = useAppDispatch()
  const selectedGoal: Goal | null = useAppSelector(
    state => state.goals.selected,
  )

  const onBackClick = () => {
    dispatch(selectGoal(null))
  }

  const onSaveClick = () => {
    dispatch(updateGoalInList(selectedGoal as Goal))
    dispatch(selectGoal(null))
  }

  const editGoal = useCallback(
    (goal: Goal) => {
      dispatch(editSelectedGoal(goal))
    },
    [dispatch],
  )

  const generatePeriodOptions = useCallback((): EditableFieldOptions => {
    const editGoalPeriod = (period: TimePeriod) => {
      editGoal({ ...(selectedGoal as Goal), period })
    }

    return [
      {
        title: 'тиждень',
        value: 'week',
        selected: goal.period === 'week',
        onSelect: editGoalPeriod,
      },
      {
        title: 'місяць',
        value: 'month',
        selected: goal.period === 'month',
        onSelect: editGoalPeriod,
      },
    ]
  }, [goal.period, selectedGoal, editGoal])

  return (
    <section>
      <nav className="flex justify-between mb-5">
        <span
          onClick={onBackClick}
          className="p-2 rounded-full cursor-pointer hover:bg-slate-200 ease-linear"
        >
          <AiOutlineArrowLeft size={'32px'} />
        </span>
        <span
          onClick={onSaveClick}
          className="p-2 rounded-full cursor-pointer hover:bg-slate-200 ease-linear"
        >
          <AiOutlineCheck size={'32px'} />
        </span>
      </nav>
      <div className="flex gap-4">
        <div className="flex items-center justify-center w-16 h-16 md:w-32 md:h-32 rounded-xl bg-primary">
          <Icon nameIcon={goal.iconName} propsIcon={{ size: '74px' }} />
        </div>
        <div className="ml-3 md:ml-8">
          <EditableField type="text">
            <h1 className="font-bold text-2xl">{goal.category}</h1>
          </EditableField>
        </div>
        <span className="font-bold text-zinc-500 text-sm md:text-md ml-auto">
          додано 21 червня 2023
        </span>
      </div>

      <div className="flex w-full items-center gap-5 mt-5">
        <div>
          <EditableField type="select" options={generatePeriodOptions()}>
            <p>
              Ліміт на{' '}
              <span className="font-medium underline">
                {uiTransformPeriod(goal.period)}
              </span>
            </p>
          </EditableField>
          <EditableField type="text">
            <span className="text-2xl">3400 грн</span>
          </EditableField>
        </div>
        <GoalProgress current={goal.current} limit={goal.limit} size="huge" />
      </div>
    </section>
  )
}
export default GoalInEdit
