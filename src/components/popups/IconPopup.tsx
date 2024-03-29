import clsx from 'clsx'
import React from 'react'
import { Icon } from '../Icon'
import Popup from '../ui/Popup'

interface IconPopupProps {
  isOpened: boolean
  onClose: () => void
  onSelect: (icon: string) => void
  iconSource: Array<string>
  preSelected: string
}

const IconPopup: React.FC<IconPopupProps> = props => {
  const handleSelectIcon = (icon: string) => {
    props.onSelect(icon)
    props.onClose()
  }

  return (
    <Popup isOpened={props.isOpened} onClose={props.onClose}>
      <Popup.Header>Обери іконку</Popup.Header>
      <div className="grid mx-auto grid-cols-5 gap-4">
        {props.iconSource.map(icon => (
          <div
            className={clsx(
              'w-full h-full sm:w-16 sm:h-16 bg-gray-100 flex items-center justify-center mx-auto rounded-md p-2 cursor-pointer hover:bg-amber-100',
              props.preSelected === icon && 'bg-primary',
            )}
            onClick={() => handleSelectIcon(icon)}
          >
            <Icon nameIcon={icon} propsIcon={{ size: '24px' }} />
          </div>
        ))}
      </div>
    </Popup>
  )
}

export default IconPopup
