import Popup from '../ui/Popup'
import clsx from 'clsx/clsx'
import { Icon } from '../Icon'
import React, { FC } from 'react'
import { GoalType } from '../../app/types/goal.type'
import { PopupProps } from './popup.props'

interface CategoryPopupProps extends PopupProps {
  categories: GoalType[]
  preSelected: GoalType
  onSelect: Function
}

const CategoryPopup: FC<CategoryPopupProps> = ({
  categories,
  onSelect,
  preSelected,
  isOpened,
  onClose,
}) => {
  return (
    <Popup isOpened={isOpened} onClose={onClose}>
      <Popup.Header>Обери категорія</Popup.Header>
      {categories.map(category => (
        <div
          className={clsx(
            'w-full h-full sm:w-16 sm:h-16 bg-gray-100 flex items-center justify-center mx-auto rounded-md p-2 cursor-pointer hover:bg-amber-100',
            preSelected.id === category.id && 'bg-primary',
          )}
          onClick={() => onSelect(category.id)}
        >
          <Icon nameIcon={category.iconName} propsIcon={{ size: '24px' }} />
        </div>
      ))}
    </Popup>
  )
}

export default CategoryPopup
