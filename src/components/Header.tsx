import React, { FC } from 'react'
import { AiOutlineSetting, AiOutlineApi } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
const Header: FC = () => {
  return (
    <header className="flex justify-between px-20 py-8">
      <NavLink to={'/'} className="font-default font-bold cursor-pointer">
        Expengo
      </NavLink>
      <div className="flex gap-6">
        <span className="flex items-center justify-center bg-primary w-8 h-8 rounded-full cursor-pointer">
          <AiOutlineApi className="fill-white" />
        </span>
        <span className="flex items-center justify-center bg-slate-200 w-8 h-8 rounded-full cursor-pointer">
          <AiOutlineSetting />
        </span>
      </div>
    </header>
  )
}

export default Header
