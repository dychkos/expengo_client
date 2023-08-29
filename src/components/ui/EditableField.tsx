import React, { PropsWithChildren, useState } from 'react'
import { AiFillTool } from 'react-icons/ai'
import clsx from 'clsx'
import { useOutsideClick } from '../../hooks/useClickOutside'

interface EditableFieldProps extends PropsWithChildren {
  type: 'text' | 'select'
  options?: EditableFieldOptions
}

export type EditableFieldOptions = Array<{
  title: string
  value: string
  selected: boolean
  onSelect: Function
}>

const EditableField: React.FC<EditableFieldProps> = ({
  children,
  type,
  options,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const ref = useOutsideClick(() => {
    setEditMode(false)
  })

  const enableEditing = () => {
    if (type === 'select') {
      setEditMode(true)
    }
  }

  return (
    <div
      ref={ref}
      className={clsx(
        'relative w-max my-2 mr-2',
        type === 'select' && 'cursor-pointer',
      )}
      onClick={enableEditing}
    >
      <span>{children}</span>
      <span className="absolute flex justify-center items-center -top-1 -right-3  w-3 h-3 rounded-full bg-black">
        <AiFillTool color="#fff" size="8px" />
      </span>

      {editMode && (
        <ul className="absolute p-3 px-5 right-0 shadow-lg rounded-xl bg-white z-20">
          {options ? (
            options.map(({ title, value, selected, onSelect }) => {
              return (
                <li
                  key={value}
                  className={clsx(
                    'hover:underline',
                    selected && 'text-gray-300',
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
