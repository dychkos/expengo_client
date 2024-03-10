import React from 'react'
import { cn } from '../../app/className'
import ExpenseCreatePopup from "../expenses/ExpenseCreatePopup";
import CategoryCreate from "../categories/CategoryCreate";
import NavBar from "../NavBar";
import SettingsSidebar from "../SettingsSidebar";

interface LayoutProps extends React.PropsWithChildren {
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return (
    <main
      className={cn('px-4 md:px-0 pt-24 mx-auto w-full sm:w-3/4 xl:w-2/4', className)}
    >
      {children}

      <CategoryCreate />
      <ExpenseCreatePopup />

      <div>
        <div className="fixed z-20 bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <NavBar />
        </div>
        <SettingsSidebar />
      </div>
    </main>
  )
}

export default Layout
