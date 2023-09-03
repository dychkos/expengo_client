import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CustomInputProps } from './Input'
import clsx from 'clsx'

const EditableInput: React.FC<CustomInputProps> = ({
  className,
  onInput,
  onChange,
  value,
  ...props
}) => {
  const clearStyles =
    'appearance-none block w-auto bg-white border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:text-gray-900'

  const inputRef = useRef<HTMLInputElement | null>(null)

  // Function to update input width based on content
  const updateInputWidth = () => {
    if (inputRef.current) {
      const inputWidth = inputRef.current.scrollWidth + 2 // Add some padding
      inputRef.current.style.width = `${inputWidth}px`
    }
  }

  // Event handler for input value change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event)
    updateInputWidth()
  }

  // Initialize input width when component mounts
  useEffect(() => {
    updateInputWidth()
  }, [value])

  return (
    <input
      {...props}
      value={value}
      ref={inputRef}
      className={clsx(clearStyles, className)}
      onChange={handleInputChange}
      onInput={onInput}
    />
  )
}

export default EditableInput
