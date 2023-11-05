import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react'
import { cn } from '../../app/className'
import { Icon } from '../Icon'
import uniqid from 'uniqid'

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
}

const Input: React.FC<CustomInputProps> = ({
  className,
  onInput,
  onChange,
  icon,
  id = uniqid(),
  ...props
}) => {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute | undefined>(
    props.type,
  )

  const mouseOverHandler = () => {
    if (props.type === 'password') {
      setInputType('text')
    }
  }

  const mouseOutHandler = () => {
    setInputType(props.type)
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Email
      </label>
      <input
        {...props}
        className={cn(
          'w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm',
          className,
        )}
        onChange={onChange}
        onInput={onInput}
        type={inputType}
        id={id}
      />
      {icon && (
        <span
          className="absolute inset-y-0 end-0 grid cursor-pointer place-content-center px-4"
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseOutHandler}
        >
          <Icon nameIcon={icon} propsIcon={{ size: '14px', color: 'rgb(156 163 175)' }} />
        </span>
      )}
    </div>
  )
}

export default Input
