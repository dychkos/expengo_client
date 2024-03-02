import clsx from 'clsx'
import {
  AiOutlineLineChart,
  AiOutlineRotateRight,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../store'

const NavBar = () => {
  const isAuth = useAppSelector(state => state.user.isAuthorized)

  if (!isAuth) return <></>

  return (
    <nav className="flex justify-between backdrop-blur-md bg-slate-400 bg-opacity-50 py-2 px-6 w-64 min-w-full rounded-2xl">
      <NavLink to={'/expenses'} className={NavItemClasses}>
        <AiOutlineUnorderedList />
      </NavLink>
      <NavLink to={'/'} className={NavItemClasses}>
        <AiOutlineRotateRight />
      </NavLink>
      <NavLink to={'/stats'} className={NavItemClasses}>
        <AiOutlineLineChart />
      </NavLink>
    </nav>
  )
}

const NavItemClasses = (state: { isActive: boolean; isPending: boolean }) =>
  clsx(
    'flex items-center justify-center rounded-full h-12 w-12 hover:bg-primary hover:bg-opacity-50 transition-all cursor-pointer'.concat(
      !state.isActive ? ' bg-white' : '',
    ),
    {
      'bg-primary': state.isActive,
    },
  )

export default NavBar
