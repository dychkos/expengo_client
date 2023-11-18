import React, { FC, useEffect, useState } from 'react'
import { PopupProps } from './popup.props'
import Popup from '../ui/Popup'
import { Icon } from '../Icon'
import { EditableInput } from '../ui/EditableField'
import { Digits } from '../../app/patterns'
import Button from '../ui/Button'
import { defaultExpense, ExpenseType } from '../../app/types/expense.type'
import { useAppSelector } from '../../store'
import GoalPopup from './GoalPopup'
import { GoalType } from '../../app/types/goal.type'
import { useValidator } from '../../hooks'
import { ExpenseSchema } from '../../app/validation/schemas/expense.schema'
import { NumericMaxLength } from '../../app/variables'

interface ExpensePopupProps extends PopupProps {
  expense?: ExpenseType
  focusOnShow?: boolean
  onSaveClick: (expense: ExpenseType) => void
  onRemoveClick: (expense: ExpenseType) => void
}

const ExpensePopup: FC<ExpensePopupProps> = props => {
  const [current, setCurrent] = useState<ExpenseType>(props.expense || defaultExpense)
  const [showGoal, setShowGoal] = useState<boolean>(false)

  const selectedGoal = useAppSelector(state => {
    const selectedById = state.goals.list.find(goal => goal.id === current?.goalId)
    return selectedById || state.goals.list[0]
  })

  const goals = useAppSelector(state => state.goals.list)
  const { validate, clearError, checkError } = useValidator()

  useEffect(() => {
    if (!current.goalId && selectedGoal) {
      setCurrent({ ...current, goalId: selectedGoal.id })
    }
  }, [])

  const onFieldEdit = (field: keyof ExpenseType, value: any) => {
    clearError(field)
    setCurrent({ ...current, [field]: value })
  }

  const onSaveClick = () => {
    if (validate(current, ExpenseSchema)) {
      props.onSaveClick(current)
    }
  }

  return (
    <React.Fragment>
      <Popup
        isOpened={props.isOpened}
        onClose={props.onClose}
        className="sm:w-2/3 xl:w-1/3"
      >
        <Popup.Header>Редагування витрати</Popup.Header>
        <div className="flex gap-4 items-center overflow-x-hidden">
          <div
            className="flex flex-shrink-0 cursor-pointer  items-center justify-center p-4 max-h-full rounded-xl bg-primary"
            onClick={() => setShowGoal(true)}
          >
            <Icon nameIcon={selectedGoal.iconName} propsIcon={{ size: '36px' }} />
          </div>
          <div>
            <EditableInput
              type="text"
              value={current.price.toString()}
              error={checkError('price')}
              className="font-default font-bold text-4xl"
              regex={Digits}
              focusDefault={props.focusOnShow}
              onEdit={(val: string) => onFieldEdit('price', val)}
              inputMode={'numeric'}
              maxLength={NumericMaxLength}
              afterText="грн"
              placeholder={'150 грн'}
            />
            <EditableInput
              type="text"
              value={current.title}
              error={checkError('title')}
              onEdit={(val: string) => onFieldEdit('title', val)}
              className="font-default text-md text-zinc-500"
            />
          </div>
        </div>
        <Popup.Footer>
          <Button onClick={onSaveClick}>Зберегти</Button>
          {props.expense && (
            <Button variant="outline" onClick={() => props.onRemoveClick(current)}>
              Видалити
            </Button>
          )}
        </Popup.Footer>
      </Popup>
      <GoalPopup
        categories={goals}
        preSelectedId={current.goalId}
        onSelect={(goal: GoalType) => onFieldEdit('goalId', goal.id)}
        isOpened={showGoal}
        onClose={() => setShowGoal(false)}
      />
    </React.Fragment>
  )
}

export default ExpensePopup
