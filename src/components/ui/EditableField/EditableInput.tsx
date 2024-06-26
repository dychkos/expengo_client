import clsx from 'clsx'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { EditableInputProps } from './editable.props'
import { useOutsideClick } from '../../../hooks'
import { AiFillTool } from 'react-icons/ai'
import { cn } from '../../../app/className'

const EditableInput: FC<EditableInputProps> = ({
  value,
  className,
  onEdit,
  onChange,
  error,
  placeholder,
  regex,
  afterText,
  focusDefault = false,
  tipPos = 'right',
  allowEdit = true,
  ...props
}) => {
  const [editMode, setEditMode] = useState<boolean>(focusDefault)

  const [initialValue] = useState<string>(value ? value.toString() : '')

  useEffect(() => {
    if (editMode) {
      focusChildInput()
    }
  }, [editMode])

  useEffect(() => {
    if (focusDefault) {
      onEdit('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusDefault])

  const outsideRef = useOutsideClick(() => {
    if (value.length > 0) {
      setEditMode(false)
    }
  })

  const inputRef = useRef<HTMLInputElement | null>(null)

  const focusChildInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const enableEditMode = () => {
    if (allowEdit) {
      setEditMode(true)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event)
    }
  }

  const handleInputUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value
    if (onEdit && (!regex || regex.test(val))) {
      onEdit(val)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEditMode(false)
    }

    if (event.key === 'Tab') {
      // Handle the Tab key press here, e.g., prevent default behavior
      console.log('Tab key was pressed')
    }
  }

  return (
    <div
      ref={outsideRef}
      className={cn(
        'my-2 mr-2 flex items-end gap-4 cursor-pointer',
        error && 'shake-elem',
      )}
      onClick={enableEditMode}
    >
      <div>
        {editMode && (
          <input
            value={value}
            ref={inputRef}
            placeholder={placeholder ?? initialValue}
            className={clsx(
              clearStyles,
              className,
              error && 'text-red-500 placeholder-red-500',
            )}
            onChange={handleInputChange}
            onInput={handleInputUpdate}
            onKeyDown={handleKeyDown}
            {...props}
          />
        )}

        {!editMode && (
          <div className="relative">
            <p
              className={clsx(
                className,
                error && 'text-red-500',
                'text-clip overflow-hidden',
              )}
            >
              {value}
            </p>

            {allowEdit &&
                <span
                    className={clsx(
                        'absolute flex justify-center items-center -top-1 w-3 h-3 rounded-full bg-black',
                        tipPos === 'left' ? '-left-4' : '-right-4',
                    )}
                >
              <AiFillTool color="#fff" size="8px" />
            </span>}
          </div>
        )}
      </div>

      {afterText && !editMode && (
        <p className={cn(className, 'text-gray-600 text-2xl', error && 'text-red-400')}>
          {afterText}
        </p>
      )}
    </div>
  )
}

const clearStyles =
  'appearance-none block w-full bg-white border border-none placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:text-gray-900'

export default EditableInput
