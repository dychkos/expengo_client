import React from 'react'
import { Goal, TimePeriod } from '../../app/types/goal'
import { Icon } from '../Icon'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../store'
import { editSelectedGoal, updateGoalInList } from '../../store/goalsSlice'
import EditableField from '../ui/EditableField'
import GoalProgress from '../GoalProgress'
import { uiTransformPeriod } from '../../app/helper'
import { switchGoalView } from '../../store/appSlice'
import { GoalViewMode } from '../../app/types/app.type'
import { GoalInEditSchema } from '../../app/validation/schemas/goal.schema'
import { useValidator } from '../../hooks/useValidator'

interface EditGoalProps {
  goal: Goal
}

const GoalInEdit: React.FC<EditGoalProps> = ({ goal }) => {
  const dispatch = useAppDispatch()
  const selectedGoal: Goal | null = useAppSelector(state => state.goals.selected)

  const { checkError, validate } = useValidator()

  const toInitialView = () => {
    dispatch(switchGoalView(GoalViewMode.GOAL_LIST))
  }

  const onSaveClick = () => {
    const isValid = validate(selectedGoal, GoalInEditSchema)

    if (isValid) {
      dispatch(updateGoalInList(selectedGoal as Goal))
      toInitialView()
    }
  }

  const editGoal = (goal: Goal) => {
    dispatch(editSelectedGoal(goal))
  }

  const handleFieldUpdate = (field: keyof Goal, value: string) => {
    editGoal({ ...goal, [field as string]: value })
  }

  const editGoalPeriod = (period: TimePeriod) => {
    editGoal({ ...(selectedGoal as Goal), period })
  }

  const periodOptions = [
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

  return (
    <section>
      <nav className="flex justify-between mb-5">
        <span
          onClick={toInitialView}
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

      <div className="grid grid-cols-3-one-two-one">
        <div className="w-auto">
          <div className="flex w-12 h-12 md:w-24 md:h-24 items-center justify-center rounded-xl bg-primary">
            <Icon nameIcon={goal.iconName} propsIcon={{ size: '64px' }} />
          </div>
        </div>

        <div className="w-auto">
          <EditableField
            type="text"
            className="font-bold text-2xl"
            innerText={goal.category}
            placeholder={'Назва категорії витрат'}
            onEdit={(val: string) => handleFieldUpdate('category', val)}
            error={checkError('category')}
            tipPos="left"
          />
        </div>

        <div className="w-auto">
          <span className="font-default font-bold leading-3 text-zinc-500 text-xs ml-auto">
            21 червня 2023
          </span>
        </div>
      </div>

      <div className="grid grid-rows-2 md:grid-cols-2-one-two gap-5 mt-5">
        <div>
          <div className="flex items-center gap-2">
            <span>Ліміт на</span>
            <EditableField
              type="select"
              className="font-medium underline"
              innerText={uiTransformPeriod(goal.period)}
              options={periodOptions}
              error={checkError('period')}
            />
          </div>

          <div className="flex items-center gap-2">
            <EditableField
              type="text"
              className="text-xl md:text-2xl"
              innerText={`${goal.limit}`}
              onEdit={(val: string) => handleFieldUpdate('limit', val)}
              error={checkError('limit')}
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
