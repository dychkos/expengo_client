import React, { useState } from 'react'
import { GoalType } from '../../app/types/goal.type'
import { Icon } from '../Icon'
import { useAppDispatch } from '../../store'
import { updateGoalInList } from '../../store/goalsSlice'
import GoalProgress from '../GoalProgress'
import { uiTransformDate, uiTransformPeriod } from '../../app/helper'
import { switchGoalView } from '../../store/appSlice'
import { GoalViewMode, StatsOptions } from '../../app/types/app.type'
import { GoalInEditSchema } from '../../app/validation/schemas/goal.schema'
import { useExpenseCountByGoal, useValidator } from '../../hooks'
import IconPopup from '../popups/IconPopup'
import { Icons } from '../../app/temp'
import { Digits } from '../../app/patterns'
import EditableSelect from '../ui/EditableField/EditableSelect'
import EditableInput from '../ui/EditableField/EditableInput'
import { PeriodOptions } from '../../app/variables'
import DrawerLayout from '../layouts/DrawerLayout'

interface EditGoalProps {
  goal: GoalType
}

const GoalInEdit: React.FC<EditGoalProps> = ({ goal }) => {
  const dispatch = useAppDispatch()

  const [currentGoal, setCurrentGoal] = useState(goal)
  const [showIconEdit, setShowIconEdit] = useState(false)

  const { validate, clearError, checkError } = useValidator()
  const statsOptions: StatsOptions = {
    targetMonth: new Date(Date.now()).getMonth(),
    targetYear: new Date(Date.now()).getFullYear(),
    totalValues: false,
    includeCurrentWeek: goal.period === 'week',
  }
  const currentlyExpended = useExpenseCountByGoal(goal.id, statsOptions)

  const toInitialView = () => {
    dispatch(switchGoalView(GoalViewMode.GOAL_LIST))
  }

  const onSaveClick = () => {
    const isValid = validate(currentGoal, GoalInEditSchema)

    if (isValid) {
      dispatch(updateGoalInList(currentGoal as GoalType))
      toInitialView()
    }
  }

  const handleFieldUpdate = (field: keyof GoalType, value: string) => {
    clearError(field)
    setCurrentGoal({ ...currentGoal, [field as string]: value })
  }

  return (
    <DrawerLayout handleSave={onSaveClick} handleClose={toInitialView}>
      <div className="grid grid-cols-2-80-one sm:grid-cols-3-96-60-one gap-0 sm:gap-4">
        <div>
          <div
            className="flex w-14 h-14 sm:w-24 sm:h-24 items-center cursor-pointer justify-center rounded-xl bg-primary"
            onClick={() => setShowIconEdit(true)}
          >
            <Icon nameIcon={currentGoal.iconName} propsIcon={{ size: '48px' }} />
          </div>
        </div>

        <div>
          <EditableInput
            className="font-bold text-2xl"
            value={currentGoal.category}
            placeholder={'Назва категорії витрат'}
            onEdit={(val: string) => handleFieldUpdate('category', val)}
            error={checkError('category')}
          />
        </div>

        <div>
          <span className="hidden sm:block font-default font-bold leading-3 text-zinc-500 text-xs text-right ml-auto">
            {uiTransformDate(currentGoal.createdAt)}
          </span>
        </div>
      </div>

      <div className="grid grid-rows-2 md:grid-cols-2-one-two gap-5 mt-5">
        <div>
          <div className="flex items-center gap-2">
            <span>Ліміт на</span>
            <EditableSelect
              className="font-medium underline"
              innerText={uiTransformPeriod(currentGoal.period)}
              options={PeriodOptions}
              error={checkError('period')}
              onEdit={(val: string) => handleFieldUpdate('period', val)}
            />
          </div>

          <div className="flex items-center gap-2">
            <EditableInput
              type="text"
              className="text-xl md:text-2xl"
              value={`${currentGoal.limit}`}
              maxLength={7}
              regex={Digits}
              onEdit={(val: string) => handleFieldUpdate('limit', val)}
              error={checkError('limit')}
              afterText="грн"
            />
          </div>
        </div>

        <GoalProgress current={currentlyExpended} limit={currentGoal.limit} size="huge" />
      </div>

      <IconPopup
        isOpened={showIconEdit}
        onClose={() => setShowIconEdit(false)}
        onSelect={(icon: string) => handleFieldUpdate('iconName', icon)}
        preSelected={currentGoal.iconName}
        iconSources={Icons}
      />
    </DrawerLayout>
  )
}
export default GoalInEdit
