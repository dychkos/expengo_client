import { PropsWithChildren } from 'react'

export interface PopupProps extends PropsWithChildren {
  isOpened: boolean
  onClose: Function
  className?: string
}
