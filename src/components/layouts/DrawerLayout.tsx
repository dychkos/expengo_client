import React, { PropsWithChildren } from 'react'
import CircleBtn from '../ui/CircleBtn'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'

interface DrawerProps extends PropsWithChildren {
  handleClose: () => void
  handleSave: () => void
}

const DrawerLayout: React.FC<DrawerProps> = ({ handleClose, handleSave, children }) => {
  return (
    <section>
      <nav className="flex justify-between mb-5">
        <CircleBtn onClick={handleClose}>
          <AiOutlineArrowLeft size={'24px'} />
        </CircleBtn>

        <CircleBtn onClick={handleSave}>
          <AiOutlineCheck size={'24px'} />
        </CircleBtn>
      </nav>

      <div>{children}</div>
    </section>
  )
}
export default DrawerLayout
