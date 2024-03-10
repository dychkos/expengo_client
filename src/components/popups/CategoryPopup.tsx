import React, { FC } from 'react'
import { cn } from '../../app/className'
import { CategoryType } from '../../app/types/category.type'
import Popup from '../ui/Popup'
import { PopupProps } from './popup.props'
import { useAppDispatch } from '../../store'
import { toggleAddingCategory } from '../../store/appSlice'
import CategoryCard from '../categories/CategoryCard'

interface CategoryPopupProps extends PopupProps {
  categories: CategoryType[]
  preSelectedId: string
  onSelect: (category: CategoryType) => void
}

const CategoryPopup: FC<CategoryPopupProps> = ({
  categories,
  onSelect,
  preSelectedId,
  isOpened,
  onClose,
}) => {
  const dispatch = useAppDispatch()

  const addCategory = () => {
    dispatch(toggleAddingCategory())
  }

  const handleSelectCategory = (category: CategoryType) => {
    onSelect(category)
    onClose()
  }

  return (
    <Popup isOpened={isOpened} onClose={onClose}>
      <Popup.Header>Обери категорію</Popup.Header>
      <div className="grid mx-auto content-center grid-cols-3 md:grid-cols-4 gap-8 md:gap-4">
        {categories.length > 0 &&
          categories.map(category => (
            <CategoryCard
              key={category.id}
              iconName={category.iconName}
              onClick={() => handleSelectCategory(category)}
              className={cn(preSelectedId === category.id && 'bg-primary')}
              title={category.title}
            />
          ))}

        <CategoryCard
          onClick={addCategory}
          title="Додати категорію"
          iconName="FiPlusCircle"
        />
      </div>
    </Popup>
  )
}

export default CategoryPopup
