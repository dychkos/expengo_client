import React from 'react'
import { Icon } from '../Icon'
import { cn } from '../../app/className'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'huge'
  icon?: string
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        'inline-block rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700',
        props.icon && 'flex items-center justify-center gap-2',
        variant === 'outline' && 'text-gray-700 bg-white border hover:bg-gray-100',
        variant === 'huge' && 'h-12 font-bold focus:ring-4 text-md',
        className,
      )}
    >
      {props.icon && <Icon nameIcon={props.icon} propsIcon={{ size: '16px' }} />}
      {children}
    </button>
  )
}

export default Button
