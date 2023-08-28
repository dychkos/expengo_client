import React from 'react'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  size?: 'default' | 'huge'
}
export const Button: React.FC<ButtonProps> = ({
  className,
  size = 'default',
  children,
}) => {
  return (
    <main
      className={clsx(
        'px-3 py-2 bg-slate-200 rounded-xl text-center cursor-pointer font-medium',
        size === 'default' ? 'w-32' : 'w-48',
        className,
      )}
    >
      {children}
    </main>
  )
}

export default Button
