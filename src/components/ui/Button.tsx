import React from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline'
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
      className={clsx(
        'inline-block rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white',
        props.icon && 'flex items-center justify-center gap-2',
        variant === 'outline' &&
          'text-gray-700 transition-colors duration-200 bg-white border hover:bg-gray-100',
        className,
      )}
    >
      {props.icon && <Icon nameIcon={props.icon} propsIcon={{ size: '16px' }} />}
      {children}
    </button>
  )
}

export default Button
