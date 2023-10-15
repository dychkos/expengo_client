import React from 'react'
import clsx from 'clsx'

interface LayoutProps extends React.PropsWithChildren {
  className?: string
}
export const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return (
    <main
      className={clsx(className, 'px-4 md:px-0 pt-16 m-auto w-full sm:w-3/4 xl:w-2/4')}
    >
      {children}
    </main>
  )
}

export default Layout
