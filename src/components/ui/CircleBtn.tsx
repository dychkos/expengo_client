import React, { PropsWithChildren } from 'react'

interface CircleButtonProps extends PropsWithChildren {
  onClick: Function
}

const CircleBtn: React.FC<CircleButtonProps> = ({ children, onClick }) => {
  return (
    <span
      onClick={() => onClick()}
      className="w-8 h-8 flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-200 ease-linear"
    >
      {children}
    </span>
  )
}

export default CircleBtn
