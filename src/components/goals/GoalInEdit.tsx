import React, { useState } from 'react'
import { GoalType, TimePeriod } from '../../app/types/goal.type'
import { Icon } from '../Icon'
import { useAppDispatch, useAppSelector } from '../../store'
import { editSelectedGoal, updateGoalInList } from '../../store/goalsSlice'
import GoalProgress from '../GoalProgress'
import { uiTransformPeriod } from '../../app/helper'
import { switchGoalView } from '../../store/appSlice'
import { GoalViewMode } from '../../app/types/app.type'
import { GoalInEditSchema } from '../../app/validation/schemas/goal.schema'
import { useValidator, useExpensesByGoal } from '../../hooks'
import CircleBtn from '../ui/CircleBtn'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import IconPopup from '../popups/IconPopup'
import { Icons } from '../../app/temp'
import { Digits } from '../../app/patterns'
import EditableSelect from '../ui/EditableField/EditableSelect'
import EditableInput from '../ui/EditableField/EditableInput'

interface EditGoalProps {
  goal: GoalType
}

const GoalInEdit: React.FC<EditGoalProps> = ({ goal }) => {
  const dispatch = useAppDispatch()
  const selectedGoal: GoalType | null = useAppSelector(state => state.goals.selected)
  const currentlyExpended = useExpensesByGoal(goal.id)

  const [showIconEdit, setShowIconEdit] = useState(false)

  const { validate, clearError, checkError } = useValidator()

  const toInitialView = () => {
    dispatch(switchGoalView(GoalViewMode.GOAL_LIST))
  }

  const onSaveClick = () => {
    const isValid = validate(selectedGoal, GoalInEditSchema)

    if (isValid) {
      dispatch(updateGoalInList(selectedGoal as GoalType))
      toInitialView()
    }
  }

  const editGoal = (goal: GoalType) => {
    dispatch(editSelectedGoal(goal))
  }

  const handleFieldUpdate = (field: keyof GoalType, value: string) => {
    clearError(field)
    editGoal({ ...goal, [field as string]: value })
  }

  const editGoalPeriod = (period: TimePeriod) => {
    editGoal({ ...(selectedGoal as GoalType), period })
  }

  const handleIconChange = (icon: string) => {
    editGoal({ ...goal, iconName: icon })
  }

  const periodOptions = [
    {
      title: 'тиждень',
      value: 'week',
    },
    {
      title: 'місяць',
      value: 'month',
    },
  ]

  return (
    <>
      <section>
        <nav className="flex justify-between mb-5">
          <CircleBtn onClick={toInitialView}>
            <AiOutlineArrowLeft size={'24px'} />
          </CircleBtn>

          <CircleBtn onClick={onSaveClick}>
            <AiOutlineCheck size={'24px'} />
          </CircleBtn>
        </nav>

        <div className="grid grid-cols-2-80-one sm:grid-cols-3-96-60-one gap-0 sm:gap-4">
          <div>
            <div
              className="flex w-14 h-14 sm:w-24 sm:h-24 items-center cursor-pointer justify-center rounded-xl bg-primary"
              onClick={() => setShowIconEdit(true)}
            >
              <Icon nameIcon={goal.iconName} propsIcon={{ size: '48px' }} />
            </div>
          </div>

          <div>
            <EditableInput
              className="font-bold text-2xl"
              value={goal.category}
              placeholder={'Назва категорії витрат'}
              onEdit={(val: string) => handleFieldUpdate('category', val)}
              error={checkError('category')}
            />
          </div>

          <div>
            <span className="hidden sm:block font-default font-bold leading-3 text-zinc-500 text-xs ml-auto">
              21 червня 2023
            </span>
          </div>
        </div>

        <div className="grid grid-rows-2 md:grid-cols-2-one-two gap-5 mt-5">
          <div>
            <div className="flex items-center gap-2">
              <span>Ліміт на</span>
              <EditableSelect
                className="font-medium underline"
                innerText={uiTransformPeriod(goal.period)}
                options={periodOptions}
                error={checkError('period')}
                onEdit={editGoalPeriod}
              />
            </div>

            <div className="flex items-center gap-2">
              <EditableInput
                type="text"
                className="text-xl md:text-2xl"
                value={`${goal.limit}`}
                maxLength={7}
                regex={Digits}
                onEdit={(val: string) => handleFieldUpdate('limit', val)}
                error={checkError('limit')}
                afterText="грн"
              />
            </div>
          </div>

          <GoalProgress current={currentlyExpended} limit={goal.limit} size="huge" />
        </div>
      </section>

      <IconPopup
        isOpened={showIconEdit}
        onClose={() => setShowIconEdit(false)}
        onSelect={handleIconChange}
        preSelected={goal.iconName}
        iconSources={Icons}
      />
    </>
  )
}
export default GoalInEdit
