import React, { PropsWithChildren } from 'react'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import CircleBtn from '../ui/CircleBtn'
import ReactPortal from "../ReactPortal";

interface DrawerProps extends PropsWithChildren {
  handleClose: () => void
  handleSave: () => void
  disabled?: boolean
}

const DrawerLayout: React.FC<DrawerProps> = ({
  handleClose,
  handleSave,
  children,
  disabled,
}) => {
  return (
    <ReactPortal wrapperId="common-popup">
      <section className="fixed top-0 left-0 right-0 bottom-0 box-border z-30 bg-white pt-24 mx-auto w-full">
        <div className="md:px-0 mx-auto sm:w-3/4 xl:w-2/4">
          <nav className="flex justify-between mb-5">
            <CircleBtn onClick={handleClose} disabled={disabled}>
              <AiOutlineArrowLeft size={'24px'} />
            </CircleBtn>

            <CircleBtn onClick={handleSave} disabled={disabled}>
              <AiOutlineCheck size={'24px'} />
            </CircleBtn>
          </nav>

          <div>{children}</div>
        </div>

      </section>
    </ReactPortal>
  )
}
export default DrawerLayout
