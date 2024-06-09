import { InputHTMLAttributes } from 'react'

export interface EditableProps {
  error: boolean
  afterText?: string
  tipPos?: 'left' | 'right'
  onEdit: Function
  className?: string
  allowEdit?: boolean
}

export interface EditableInputProps extends EditableProps, InputHTMLAttributes<HTMLInputElement> {
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
