import { Icon } from '../Icon'
import React from 'react'
import { cn } from '../../app/className'

interface CategoryCardProps {
  onClick: () => void
  iconName: string
  title: string
  className?: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  onClick,
  iconName,
  className,
  title,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={cn(
          'w-full sm:w-16 h-16 bg-slate-100 flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-amber-100',
          className,
        )}
        onClick={onClick}
      >
        <Icon nameIcon={iconName} propsIcon={{ size: '24px' }} />
      </div>
      <p className="font-default text-sm text-gray-600 text-center mt-1">{title}</p>
    </div>
  )
}

export default CategoryCard
