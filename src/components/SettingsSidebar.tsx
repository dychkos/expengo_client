import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { useLogout, useOutsideClick } from '../hooks'
import { useAppDispatch, useAppSelector } from '../store'
import {togglePremium, toggleSettings, toggleUpdatePassword, toggleUpdateUserInfo} from '../store/appSlice'
import { SettingsFooter } from './settings/SettingsFooter'
import SettingsItem from './settings/SettingsItem'
import SettingsMultipleItem from './settings/SettingsMultipleItem'
import {SUPPORT_LINK} from "../app/variables";
import SettingsPasswordPopup from "./settings/SettingsPasswordPopup";

const SettingsSidebar: React.FC = () => {
  const isOpen = useAppSelector(state => state.app.settingsOpen)
  const dispatch = useAppDispatch()
  const { logout } = useLogout()

  const toggleSettingsSidebar = () => {
    dispatch(toggleSettings())
  }

  const togglePremiumModal = () => {
    dispatch(toggleSettings())
    dispatch(togglePremium())
  }

  const handleLogout = () => {
    toggleSettingsSidebar()
    logout()
  }

  const handlePasswordUpdate = () => {
    dispatch(toggleSettings())
    dispatch(toggleUpdatePassword())
  }

  const handleUserInfoUpdate = () => {
    dispatch(toggleSettings())
    dispatch(toggleUpdateUserInfo())
  }

  const handleSupport = () => {
    window.open(SUPPORT_LINK, '_blank')?.focus();
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
            <SettingsItem onClick={handleUserInfoUpdate}>Редагувати інформацію</SettingsItem>
            <SettingsItem onClick={handlePasswordUpdate}>Змінити пароль</SettingsItem>
          </SettingsMultipleItem>

          <SettingsItem onClick={handleSupport}>Чат підтримки</SettingsItem>

          <SettingsItem className="font-bold" onClick={handleLogout}>
            Вийти з системи
          </SettingsItem>
        </ul>
      </div>
      <SettingsFooter />
    </div>
  )
}

export default SettingsSidebar
