import { FC } from 'react'
import { AiOutlineApi, AiOutlineSetting } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { togglePremium, toggleSettings } from '../store/appSlice'
import PremiumPopup from './popups/PremiumPopup'

const Header: FC = () => {
  const premiumShow = useAppSelector(state => state.app.premiumShow)

  const dispatch = useAppDispatch()

  const togglePremiumPopup = () => {
    dispatch(togglePremium())
  }

  const toggleSettingsSidebar = () => {
    dispatch(toggleSettings())
  }

  return (
    <header className="fixed z-10 flex justify-between bg-white shadow-sm px-4 md:px-20 py-4 w-full">
      <NavLink to={'/'} className="font-default font-bold cursor-pointer">
        Expengo
      </NavLink>
      <div className="flex gap-6">
        <span
          className="flex items-center justify-center bg-primary w-8 h-8 rounded-full cursor-pointer"
          onClick={togglePremiumPopup}
        >
          <AiOutlineApi className="fill-white" />
        </span>
        <span
          className="flex items-center justify-center bg-slate-200 w-8 h-8 rounded-full cursor-pointer"
          onClick={toggleSettingsSidebar}
        >
          <AiOutlineSetting />
        </span>
      </div>
      <PremiumPopup isOpened={premiumShow} onClose={togglePremiumPopup} />
    </header>
  )
}

export default Header
