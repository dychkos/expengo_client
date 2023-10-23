import { CustomInputProps } from '../Input'

export interface EditableProps {
  error: boolean
  afterText?: string
  tipPos?: 'left' | 'right'
  onEdit?: Function
  className?: string
}

export interface EditableInputProps extends EditableProps, CustomInputProps {
  value: string
  focusDefault?: boolean
  regex?: RegExp
}

export interface EditableSelectProps extends EditableProps {
  innerText: string
  options: EditableSelectOptions
}

export type EditableSelectOptions = Array<{
  title: string
  value: string
}>
