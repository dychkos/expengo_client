import React, { FormEvent, PropsWithChildren, useState } from 'react'
import { AiFillTool } from 'react-icons/ai'
import clsx from 'clsx'
import { useOutsideClick } from '../../hooks/useClickOutside'
import EditableInput from './EditableInput'

interface EditableFieldProps extends PropsWithChildren {
  type: 'text' | 'select'
  innerText: string
  onEdit?: Function
  className?: string
  options?: EditableFieldOptions
}

export type EditableFieldOptions = Array<{
  title: string
  value: string
  onSelect: Function
}>

const EditableField: React.FC<EditableFieldProps> = ({
  className,
  innerText,
  onEdit,
  type,
  options,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const ref = useOutsideClick(() => {
    setEditMode(false)
  })

  const enableEditing = () => {
    setEditMode(true)
  }

  const handleFieldEdit = (event: FormEvent<HTMLInputElement>) => {
    onEdit && onEdit(event.currentTarget.value)
  }

  return (
    <div
      ref={ref}
      className={clsx('relative w-max my-2 mr-2', 'cursor-pointer')}
      onClick={enableEditing}
    >
      <div className="w-max">
        {editMode && type === 'text' && (
          <EditableInput
            value={innerText}
            onInput={handleFieldEdit}
            className={className}
          />
        )}
        {(type === 'select' || (type === 'text' && !editMode)) && (
          <span className={className}>{innerText}</span>
        )}
      </div>
      <span className="absolute flex justify-center items-center -top-1 -right-3 w-3 h-3 rounded-full bg-black">
        <AiFillTool color="#fff" size="8px" />
      </span>

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
    </div>
  )
}

export default EditableField
