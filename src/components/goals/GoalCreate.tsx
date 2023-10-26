import React, { useState } from 'react'
import { Icon } from '../Icon'
import { useAppDispatch } from '../../store'
import { createGoal } from '../../store/goalsSlice'
import { switchGoalView } from '../../store/appSlice'
import { GoalInEditSchema } from '../../app/validation/schemas/goal.schema'
import { useValidator } from '../../hooks'
import CircleBtn from '../ui/CircleBtn'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import IconPopup from '../popups/IconPopup'
import { defaultGoal, GoalType } from '../../app/types/goal.type'
import { GoalViewMode } from '../../app/types/app.type'
import { uiTransformPeriod } from '../../app/helper'
import { Icons } from '../../app/temp'
import { Digits } from '../../app/patterns'
import { PeriodOptions } from '../../app/variables'
import EditableSelect from '../ui/EditableField/EditableSelect'
import EditableInput from '../ui/EditableField/EditableInput'

const GoalCreate: React.FC = () => {
  const dispatch = useAppDispatch()
  const [currentGoal, setCurrentGoal] = useState<GoalType>(defaultGoal)
  const [iconEdit, setIconEdit] = useState<boolean>(false)

  const { validate, clearError, checkError } = useValidator()

  const toInitialView = () => {
    dispatch(switchGoalView(GoalViewMode.GOAL_LIST))
  }

  const onSaveClick = () => {
    const isValid = validate(currentGoal, GoalInEditSchema)

    if (isValid) {
      dispatch(createGoal(currentGoal))
      toInitialView()
    }
  }

  const handleFieldUpdate = (field: keyof GoalType, value: string) => {
    clearError(field)
    setCurrentGoal({ ...currentGoal, [field as string]: value })
  }

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
              onClick={() => setIconEdit(true)}
            >
              <Icon nameIcon={currentGoal.iconName} propsIcon={{ size: '48px' }} />
            </div>
          </div>

          <div>
            <EditableInput
              className="font-bold text-2xl"
              value={currentGoal.category}
              focusDefault={true}
              placeholder={'Назва категорії витрат'}
              onEdit={(val: string) => handleFieldUpdate('category', val)}
              error={checkError('category')}
            />
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
        </div>
      </section>

      <IconPopup
        isOpened={iconEdit}
        onClose={() => setIconEdit(false)}
        onSelect={(icon: string) => handleFieldUpdate('iconName', icon)}
        preSelected={currentGoal.iconName}
        iconSources={Icons}
      />
    </>
  )
}
export default GoalCreate
