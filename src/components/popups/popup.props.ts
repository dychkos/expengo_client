import { PropsWithChildren } from 'react'

export interface PopupProps extends PropsWithChildren {
  isOpened: boolean
  onClose: () => void
  className?: string
  disabled?: boolean
}
