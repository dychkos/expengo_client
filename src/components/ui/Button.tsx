import React from 'react'
import { cn } from '../../app/className'
import { ReactComponent as SpinnerSvg } from '../../components/ui/icons/LoadingSpinner.svg'
import { Icon } from '../Icon'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'huge' | 'danger'
  icon?: string
  loading?: boolean
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
        'inline-flex justify-center items-center gap-2 rounded-lg min-w-20 bg-blue-500 px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700',
        props.icon && 'flex flex-row items-center justify-center gap-2',
        props.loading && 'bg-slate-400 border-0 hover:bg-slate-400',
        props.disabled && 'bg-slate-400 border-0 cursor-default hover:bg-slate-400',
        variant === 'outline' && 'text-gray-700 bg-white border hover:bg-gray-100',
        variant === 'danger' && 'bg-red-600 border hover:bg-white hover:border-red-600 hover:text-red-600',
        variant === 'huge' && 'h-12 font-bold focus:ring-4 text-md',
        className,
      )}
    >
      {!props.loading && props.icon && (
        <Icon nameIcon={props.icon} propsIcon={{ size: '16px' }} />
      )}
      {props.loading ? <SpinnerSvg /> : children}
    </button>
  )
}

export default Button
