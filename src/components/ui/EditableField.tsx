import React, { PropsWithChildren } from 'react'
import { AiFillTool } from 'react-icons/ai'

const EditableField: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative w-max my-2 mr-2">
      <span>{children}</span>
      <span className="absolute flex justify-center items-center -top-1 -right-3  w-3 h-3 rounded-full bg-black">
        <AiFillTool color="#fff" size="8px" />
      </span>
    </div>
  )
}

export default EditableField
