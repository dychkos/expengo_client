import clsx from 'clsx'
import React, { ChangeEvent, ForwardedRef, forwardRef, useState } from 'react'
import { CustomInputProps } from './Input'

const EditableInput = forwardRef(
  (
    {
      value,
      className,
      onInput,
      onChange,
      min = 1,
      error,
      ...props
    }: CustomInputProps & { error: Boolean },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [initialValue] = useState<string>(value ? value.toString() : '')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event)
    }

    const handleInputUpdate = (event: ChangeEvent<HTMLInputElement>) => {
      if (typeof value === 'string' && value.length < 2) {
        return
      }
      if (onInput) onInput(event)
    }

    return (
      <input
        value={value}
        ref={ref}
        placeholder={initialValue}
        className={clsx(
          clearStyles,
          className,
          error && 'text-red-500 placeholder-red-500',
        )}
        onChange={handleInputChange}
        onInput={handleInputUpdate}
        minLength={3}
        {...props}
      />
    )
  },
)

const clearStyles =
  'appearance-none block w-auto bg-white border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:text-gray-900'

export default EditableInput
