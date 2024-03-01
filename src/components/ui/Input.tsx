import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import uniqid from 'uniqid'
import { cn } from '../../app/className'
import { Icon } from '../Icon'

interface CustomInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  error?: string
  name: Path<T>
  register: UseFormRegister<T>
  label?: string
  required?: boolean
}

const Input = <T extends FieldValues>({
  className,
  icon,
  id = uniqid(),
  name,
  register,
  label,
  required,
  ...props
}: CustomInputProps<T>) => {
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
    <div>
      <div className="relative">
        {label && (
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
        )}
        <input
          {...register(name, { required })}
          {...props}
          className={cn(
            'w-full rounded-lg border focus:outline-none focus:ring focus:border-blue-500 border-gray-200 p-4 pe-12 text-sm shadow-sm',
            props.error && 'border-red-500 text-red-400',
            className,
          )}
          type={inputType}
          id={id}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseOutHandler}
        />
        {icon && (
          <span className="absolute inset-y-0 end-0 grid cursor-pointer place-content-center px-4">
            <Icon
              nameIcon={icon}
              propsIcon={{ size: '14px', color: 'rgb(156 163 175)' }}
            />
          </span>
        )}
      </div>
      {props.error && <span className="text-sm text-red-400">{props.error}</span>}
    </div>
  )
}

export default Input
