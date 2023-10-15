import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { AiFillTool } from 'react-icons/ai'
import clsx from 'clsx'
import { useOutsideClick } from '../../hooks/useClickOutside'
import EditableInput from './EditableInput'

interface EditableFieldProps {
  type: 'text' | 'select'
  innerText: string
  error: boolean
  tipPos?: 'left' | 'right'
  inputMode?: 'none' | 'numeric'
  regex?: RegExp
  maxLength?: number
  onEdit?: Function
  className?: string
  placeholder?: string
  children?: React.ReactNode
  options?: EditableFieldOptions
}

export type EditableFieldOptions = Array<{
  title: string
  value: string
  onSelect: Function
}>

const EditableField: React.FC<EditableFieldProps> = ({
  className,
  placeholder,
  innerText,
  error,
  onEdit,
  type,
  options,
  children,
  regex = undefined,
  inputMode = 'none',
  tipPos = 'right',
  maxLength = 255,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  useEffect(() => {
    focusChildInput()
  }, [editMode])

  const outsideRef = useOutsideClick(() => {
    if (innerText.length > 0) {
      setEditMode(false)
    }
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const focusChildInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const enableEditing = () => {
    setEditMode(true)
  }

  const handleFieldEdit = (event: FormEvent<HTMLInputElement>) => {
    onEdit && onEdit(event.currentTarget.value)
  }

  return (
    <div
      ref={outsideRef}
      className={clsx('relative my-2 mr-2 flex gap-1', 'cursor-pointer')}
      onClick={enableEditing}
    >
      <div className="w-full">
        {editMode && type === 'text' && (
          <EditableInput
            ref={inputRef}
            placeholder={placeholder}
            value={innerText}
            onInput={handleFieldEdit}
            className={className}
            maxLength={maxLength}
            error={error}
            inputMode={inputMode}
            regexMask={regex}
          />
        )}

        {(type === 'select' || (type === 'text' && !editMode)) && (
          <p
            className={clsx(
              className,
              error && 'text-red-500',
              'text-clip overflow-hidden',
            )}
          >
            {innerText}
          </p>
        )}
      </div>
      {!editMode && (
        <span
          className={clsx(
            'absolute flex justify-center items-center -top-1 w-3 h-3 rounded-full bg-black',
            tipPos === 'left' ? '-left-3' : '-right-3',
          )}
        >
          <AiFillTool color="#fff" size="8px" />
        </span>
      )}
      {editMode && type === 'select' && (
        <ul className="absolute p-3 px-5 right-0 shadow-lg rounded-xl bg-white z-20">
          {options ? (
            options.map(({ title, value, onSelect }) => {
              return (
                <li
                  key={value}
                  className={clsx(
                    'hover:underline',
                    innerText === title &&
                      'text-gray-300 hover:no-underline cursor-default',
                  )}
                  onClick={() => onSelect(value)}
                >
                  {title}
                </li>
              )
            })
          ) : (
            <li className="text-sm">No Items</li>
          )}
        </ul>
      )}

      {children && !editMode && <p className={className}>{children}</p>}
    </div>
  )
}

export default EditableField
