import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import ReactPortal from '../ReactPortal'
import { useOutsideClick } from '../../hooks/useClickOutside'
import CircleBtn from './CircleBtn'
import { AiOutlineClose } from 'react-icons/ai'
import PopupHeader from './PopupHeader'
import PopupFooter from './PopupFooter'

interface PopupProps extends PropsWithChildren {
  isOpened: boolean
  onClose: Function
}

interface PopupModule {
  Header: typeof PopupHeader
  Footer: typeof PopupFooter
}

const Popup: React.FC<PopupProps> & PopupModule = ({ isOpened, onClose, children }) => {
  const outsideRef = useOutsideClick(() => {
    onClose()
  })

  useEffect(() => {
    if (document) {
      document.body.style.overflow = isOpened ? 'hidden' : 'auto'
    }
  }, [isOpened])

  if (!isOpened) return null

  let header
  let footer
  let content: Array<ReactElement> = []

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return
    if (child.type === PopupHeader) {
      header = child
    } else if (child.type === PopupFooter) {
      footer = child
    } else {
      content.push(child)
    }
  })

  return (
    <ReactPortal wrapperId="common-popup">
      <div className="fixed top-0 left-0 right-0 bottom-0 box-border z-20 flex items-center justify-center overflow-y-auto backdrop-blur-sm bg-opacity-40 bg-stone-800">
        <div
          ref={outsideRef}
          className="bg-white my-0 sm:my-32 rounded-md m-auto w-full sm:w-3/4 xl:w-2/4 h-full sm:h-auto"
        >
          <div className="mt-2 mr-2 flex justify-end">
            <CircleBtn onClick={onClose}>
              <AiOutlineClose size={'24px'} />
            </CircleBtn>
          </div>
          <div className="px-6 mb-6">
            {!!header && <header>{header}</header>}

            <main>{content}</main>

            {!!footer && <footer>{footer}</footer>}
          </div>
        </div>
      </div>
    </ReactPortal>
  )
}

Popup.Header = PopupHeader
Popup.Footer = PopupFooter
export default Popup
