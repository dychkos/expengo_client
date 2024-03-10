import React, { PropsWithChildren } from 'react'
import { cn } from '../../app/className'

interface CircleButtonProps extends PropsWithChildren {
  onClick: () => void
  disabled?: boolean
  className?: string
}

const CircleBtn: React.FC<CircleButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <span
      onClick={onClick}
      className={cn(
        'w-8 h-8 flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-200 ease-linear',
        disabled && 'cursor-default hover:bg-white pointer-events-none',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default CircleBtn
