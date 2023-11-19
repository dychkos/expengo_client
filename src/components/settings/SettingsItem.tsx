import React, { PropsWithChildren } from 'react'
import { cn } from '../../app/className'

interface SettingsItemProps extends PropsWithChildren {
  className?: string
  onClick?: () => void
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  children,
  onClick,
  className = '',
}) => {
  const defaultClasses =
    'block w-full text-left cursor-pointer rounded-lg px-4 py-2 text-md font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700'

  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <li>
      <button className={cn(defaultClasses, className)} onClick={handleClick}>
        {children}
      </button>
    </li>
  )
}

export default SettingsItem
