import React, { FC, useState } from 'react'
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

interface ExpensePopupProps extends PopupProps {
  expense?: ExpenseType
  focusOnShow?: boolean
  onSaveClick: (expense: ExpenseType) => void
}

const ExpensePopup: FC<ExpensePopupProps> = props => {
  const [current, setCurrent] = useState<ExpenseType>(props.expense || defaultExpense)
  const [showGoal, setShowGoal] = useState<boolean>(false)

  const selectedGoal = useAppSelector(state => {
    const selectedById = state.goals.list.find(goal => goal.id === current?.goalId)
    return selectedById || state.goals.list[0]
  })
  const goals = useAppSelector(state => state.goals.list)
  const onFieldEdit = (field: keyof ExpenseType, value: any) => {
    setCurrent({
      ...current,
      [field]: value,
    })
  }

  const updateExpenseGoal = (goal: GoalType) => {
    onFieldEdit('goalId', goal.id)
  }

  const onSaveClick = () => {
    props.onSaveClick(current)
  }

  return (
    <>
      <Popup
        isOpened={props.isOpened}
        onClose={props.onClose}
        className="sm:w-2/3 xl:w-1/3"
      >
        <Popup.Header>Редагування витрати</Popup.Header>
        <div className="flex gap-4 items-center overflow-x-hidden">
          <div
            className="flex cursor-pointer items-center justify-center p-4 max-h-full rounded-xl bg-primary"
            onClick={() => setShowGoal(true)}
          >
            <Icon nameIcon={selectedGoal.iconName} propsIcon={{ size: '36px' }} />
          </div>
          <div className="w-full">
            <EditableInput
              type="text"
              value={current.price.toString()}
              error={false}
              className="font-default font-bold text-4xl"
              regex={Digits}
              focusDefault={props.focusOnShow}
              onEdit={(val: string) => onFieldEdit('price', val)}
              inputMode={'numeric'}
              afterText="грн"
            />
            <EditableInput
              type="text"
              value={current.title}
              error={false}
              onEdit={(val: string) => onFieldEdit('title', val)}
              className="font-default text-md text-zinc-500"
            />
          </div>
        </div>
        <Popup.Footer>
          <Button onClick={onSaveClick}>Зберегти</Button>
        </Popup.Footer>
      </Popup>
      <GoalPopup
        categories={goals}
        preSelectedId={current.goalId}
        onSelect={updateExpenseGoal}
        isOpened={showGoal}
        onClose={() => setShowGoal(false)}
      />
    </>
  )
}

export default ExpensePopup
