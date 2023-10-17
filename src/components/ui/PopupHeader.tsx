import React, { PropsWithChildren } from 'react'

export const PopupHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="font-default font-bold text-2xl text-center mb-6">{children}</h1>
}

export default PopupHeader
