import React, { PropsWithChildren } from 'react'

export const PopupFooter: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-6">{children}</div>
}

export default PopupFooter
