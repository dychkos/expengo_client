import { FC } from 'react'
import CategoryProgress from '../CategoryProgress'
import { CategoryType } from '../../app/types/category.type'
import { getCategoryName } from '../../app/helper'

export interface CategoryItemProps {
  category: CategoryType
  onSelect: () => void
}

const CategoryItem: FC<CategoryItemProps> = ({ onSelect, category }) => {
  const { period, iconName, limit } = category
  const { week, month } = category.volume

  return (
    <div
      className="py-3 px-2 bg-transparent cursor-pointer hover:bg-slate-100 rounded-xl transition-all"
      onClick={onSelect}
    >
      <div className="flex justify-between mb-1">
        <div className="font-default text-base">{getCategoryName(category)}</div>
        <div className="font-default text-right text-base">
          {period === 'week' ? 'на тиждень' : 'на місяць'}
        </div>
      </div>

      <div className="flex items-center">
        <CategoryProgress
          current={period === 'month' ? month : week}
          limit={limit}
          icon={iconName}
        />
      </div>
    </div>
  )
}

export default CategoryItem
