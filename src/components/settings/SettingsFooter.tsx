import React from 'react'
import { useAppSelector } from '../../store'


export const SettingsFooter: React.FC = () => {
  const user = useAppSelector(state => state.user.userInfo);

  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">

        <div>
          <p className="text-xs">
            <strong className="block font-medium">{`${user?.firstName} ${user?.lastName}`}</strong>

            <span> {user?.email} </span>
          </p>
        </div>
      </div>
    </div>
  )
}
