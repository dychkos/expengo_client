import React from 'react'
import Popup from '../ui/Popup'
import { Icon } from '../Icon'
import clsx from 'clsx'

interface IconPopupProps {
  isOpened: boolean
  onClose: Function
  onSelect: Function
  iconSources: Array<string>
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
        {props.iconSources.map(icon => (
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
