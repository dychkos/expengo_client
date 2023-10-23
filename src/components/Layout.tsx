import React from 'react'
import { cn } from '../app/className'

interface LayoutProps extends React.PropsWithChildren {
  className?: string
}

export const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return (
    <main className={cn('px-4 md:px-0 pt-16 m-auto w-full sm:w-3/4 xl:w-2/4', className)}>
      {children}
    </main>
  )
}

export default Layout
