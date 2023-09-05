import React, { useCallback, useState } from 'react'
import { Goal, TimePeriod } from '../../app/types/goal'
import { Icon } from '../Icon'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../store'
import { editSelectedGoal, updateGoalInList } from '../../store/goalsSlice'
import EditableField, { EditableFieldOptions } from '../ui/EditableField'
import GoalProgress from '../GoalProgress'
import { uiTransformPeriod } from '../../app/helper'
import { switchMode } from '../../store/appSlice'
import { GoalViewMode } from '../../app/types/app.type'
import Validation from '../../app/validation/validation'
import { GoalValidationRules } from '../../app/validation/goal.validation'

interface EditGoalProps {
  goal: Goal
}

const clearErrors = {
  category: '',
  period: '',
  limit: '',
}

const GoalInEdit: React.FC<EditGoalProps> = ({ goal }) => {
  const [errors, setErrors] = useState<Record<string, string>>(clearErrors)

  const dispatch = useAppDispatch()
  const selectedGoal: Goal | null = useAppSelector(
    state => state.goals.selected,
  )

  const onBackClick = () => {
    dispatch(switchMode(GoalViewMode.GOAL_LIST))
  }

  const onSaveClick = () => {
    const errors = new Validation(selectedGoal, GoalValidationRules).validate()

    if (Object.keys(errors).length === 0) {
      dispatch(updateGoalInList(selectedGoal as Goal))
      dispatch(switchMode(GoalViewMode.GOAL_LIST))
      setErrors(clearErrors)
    } else {
      console.log(errors)
      setErrors(errors)
    }
  }

  const editGoal = useCallback(
    (goal: Goal) => {
      dispatch(editSelectedGoal(goal))
    },
    [dispatch],
  )

  const onEditField = (field: keyof Goal, value: string) => {
    editGoal({ ...goal, [field as string]: value })
  }

  const generatePeriodOptions = useCallback((): EditableFieldOptions => {
    const editGoalPeriod = (period: TimePeriod) => {
      editGoal({ ...(selectedGoal as Goal), period })
    }

    return [
      {
        title: 'тиждень',
        value: 'week',
        onSelect: editGoalPeriod,
      },
      {
        title: 'місяць',
        value: 'month',
        onSelect: editGoalPeriod,
      },
    ]
  }, [selectedGoal, editGoal])

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
          <EditableField
            type="text"
            className="font-bold text-2xl"
            innerText={goal.category}
            onEdit={(val: string) => onEditField('category', val)}
            error={!!errors['category']}
          />
        </div>
        <span className="font-bold text-zinc-500 text-sm md:text-md ml-auto">
          додано 21 червня 2023
        </span>
      </div>

      <div className="flex w-full items-center gap-5 mt-5">
        <div className="w-1/3">
          <div className="flex items-center gap-2">
            Ліміт на
            <EditableField
              type="select"
              className="font-medium underline"
              innerText={uiTransformPeriod(goal.period)}
              options={generatePeriodOptions()}
              error={!!errors['period']}
            />
          </div>

          <div className="flex items-center gap-2">
            <EditableField
              type="text"
              className="text-2xl"
              innerText={`${goal.limit}`}
              onEdit={(val: string) => onEditField('limit', val)}
              error={!!errors['limit']}
            />
            грн
          </div>
        </div>
        <GoalProgress current={goal.current} limit={goal.limit} size="huge" />
      </div>
    </section>
  )
}
export default GoalInEdit
