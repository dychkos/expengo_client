import React, { ChangeEvent, InputHTMLAttributes } from 'react'

export interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void
}

const Input: React.FC<CustomInputProps> = ({
  className,
  onInput,
  onChange,
  ...props
}) => {
  return (
    <input
      {...props}
      className={className}
      onChange={onChange}
      onInput={onInput}
    />
  )
}

export default Input
