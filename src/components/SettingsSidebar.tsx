import { useAppDispatch, useAppSelector } from '../store'
import React from 'react'
import { useOutsideClick } from '../hooks'
import { togglePremium, toggleSettings } from '../store/appSlice'
import { FaStar } from 'react-icons/fa6'
import { SettingsFooter } from './settings/SettingsFooter'
import SettingsItem from './settings/SettingsItem'
import SettingsMultipleItem from './settings/SettingsMultipleItem'

const SettingsSidebar: React.FC = () => {
  const isOpen = useAppSelector(state => state.app.settingsOpen)
  const dispatch = useAppDispatch()
  const toggleSettingsSidebar = () => {
    dispatch(toggleSettings())
  }

  const togglePremiumModal = () => {
    dispatch(toggleSettings())

    dispatch(togglePremium())
  }

  const settingsRef = useOutsideClick(toggleSettingsSidebar)

  if (!isOpen) return <></>

  return (
    <div
      ref={settingsRef}
      className="fixed right-0 top-0 z-30 flex h-screen flex-col justify-between border-e bg-white w-full sm:w-2/4 lg:w-1/4"
    >
      <div className="px-4 py-6 ">
        <div className="flex justify-between">
          <span className="font-bold text-gray-600">Expengo</span>

          <span
            className="font-light underline text-black cursor-pointer"
            onClick={toggleSettingsSidebar}
          >
            Закрити
          </span>
        </div>

        <ul className="mt-6 space-y-1">
          <SettingsItem>Основні</SettingsItem>

          <SettingsItem
            className="bg-blue-100 flex justify-between items-center"
            onClick={togglePremiumModal}
          >
            Перейти на Pro <FaStar />
          </SettingsItem>

          <SettingsMultipleItem title="Налаштування профілю">
            <SettingsItem>Змінити пароль</SettingsItem>
            <SettingsItem>Редагувати інформацію</SettingsItem>
          </SettingsMultipleItem>

          <SettingsItem>Чат підтримки</SettingsItem>

          <SettingsItem className="font-bold">Вийти з системи</SettingsItem>
        </ul>
      </div>
      <SettingsFooter
        firstName="Serhii"
        lastName="Dychko"
        email="serhii.dychko@gmail.com"
      />
    </div>
  )
}

export default SettingsSidebar
