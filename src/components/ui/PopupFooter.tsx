import React, { PropsWithChildren } from 'react'

export const PopupFooter: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>
}

export default PopupFooter
