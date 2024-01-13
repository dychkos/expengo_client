import { FC } from 'react'
import { useExpensesInCategory } from '../../hooks'
import CategoryProgress from '../CategoryProgress'
import { CategoryType } from '../../app/types/category.type'

export interface CategoryItemProps extends CategoryType {
  onSelect: () => void
}

const CategoryItem: FC<CategoryItemProps> = ({
  id,
  iconName,
  title,
  period,
  limit,
  onSelect,
}) => {

  const currentlySpent = useExpensesInCategory(id, {
    forWeek: period === 'week',
  })

  return (
    <div
      className="py-3 px-2 bg-transparent cursor-pointer hover:bg-slate-100 rounded-xl transition-all"
      onClick={onSelect}
    >
      <div className="flex justify-between mb-1">
        <div className="font-default text-base">{title}</div>
        <div className="font-default text-right text-base">
          {period === 'week' ? 'на тиждень' : 'на місяць'}
        </div>
      </div>

      <div className="flex items-center">
        <CategoryProgress current={currentlySpent} limit={limit} icon={iconName} />
      </div>
    </div>
  )
}

export default CategoryItem
