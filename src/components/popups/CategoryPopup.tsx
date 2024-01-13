import { FC } from 'react'
import { cn } from '../../app/className'
import { CategoryType } from '../../app/types/category.type'
import { Icon } from '../Icon'
import Popup from '../ui/Popup'
import { PopupProps } from './popup.props'

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

  const handleSelectCategory = (category: CategoryType) => {
    onSelect(category)
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
              onClick={() => handleSelectCategory(category)}
            >
              <Icon nameIcon={category.iconName} propsIcon={{ size: '24px' }} />
            </div>
            <p className="font-default text-sm text-gray-600 text-center mt-1">
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </Popup>
  )
}

export default CategoryPopup
