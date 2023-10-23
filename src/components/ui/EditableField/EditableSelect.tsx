import { FC, useState } from 'react'
import { AiFillTool } from 'react-icons/ai'
import clsx from 'clsx'
import { useOutsideClick } from '../../../hooks/useClickOutside'
import { EditableSelectProps } from './editable.props'

const EditableSelect: FC<EditableSelectProps> = ({
  className,
  innerText,
  error,
  onEdit,
  options,
  afterText,
  tipPos = 'right',
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const outsideRef = useOutsideClick(() => {
    if (innerText.length > 0) {
      setEditMode(false)
    }
  })

  const enableEditing = () => {
    setEditMode(true)
  }

  const handleFieldEdit = (value: string) => {
    onEdit && onEdit(value)
  }

  return (
    <div
      ref={outsideRef}
      className={clsx('relative my-2 mr-2 flex gap-1', 'cursor-pointer')}
      onClick={enableEditing}
    >
      <div className="w-full">
        <p
          className={clsx(
            className,
            error && 'text-red-500',
            'text-clip overflow-hidden',
          )}
        >
          {innerText}
        </p>
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
      {editMode && (
        <ul className="absolute p-3 px-5 right-0 shadow-lg rounded-xl bg-white z-20">
          {options ? (
            options.map(({ title, value }) => {
              return (
                <li
                  key={value}
                  className={clsx(
                    'hover:underline',
                    innerText === title &&
                      'text-gray-300 hover:no-underline cursor-default',
                  )}
                  onClick={() => handleFieldEdit(value)}
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

      {afterText && !editMode && <p className={className}>{afterText}</p>}
    </div>
  )
}

export default EditableSelect
