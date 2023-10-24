import Popup from '../ui/Popup'
import { Icon } from '../Icon'
import React, { FC } from 'react'
import { GoalType } from '../../app/types/goal.type'
import { PopupProps } from './popup.props'
import { cn } from '../../app/className'

interface GoalPopupProps extends PopupProps {
  categories: GoalType[]
  preSelectedId: number
  onSelect: Function
}

const GoalPopup: FC<GoalPopupProps> = ({
  categories,
  onSelect,
  preSelectedId,
  isOpened,
  onClose,
}) => {
  const handleSelectGoal = (goal: GoalType) => {
    onSelect(goal)
    onClose()
  }
  return (
    <Popup isOpened={isOpened} onClose={onClose}>
      <Popup.Header>Обери категорію</Popup.Header>
      <div className="grid mx-auto grid-cols-3 md:grid-cols-4 gap-8 md:gap-4">
        {categories.map(category => (
          <div key={category.id}>
            <div
              className={cn(
                'w-full h-full sm:w-16 sm:h-16 bg-gray-100 flex items-center justify-center mx-auto rounded-md p-2 cursor-pointer hover:bg-amber-100',
                preSelectedId === category.id && 'bg-primary',
              )}
              onClick={() => handleSelectGoal(category)}
            >
              <Icon nameIcon={category.iconName} propsIcon={{ size: '24px' }} />
            </div>
            <p className="font-default text-sm text-gray-600 text-center mt-1">
              {category.category}
            </p>
          </div>
        ))}
      </div>
    </Popup>
  )
}

export default GoalPopup
