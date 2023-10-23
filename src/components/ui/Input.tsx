import React, { InputHTMLAttributes } from 'react'

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<CustomInputProps> = ({
  className,
  onInput,
  onChange,
  ...props
}) => {
  return <input {...props} className={className} onChange={onChange} onInput={onInput} />
}

export default Input
