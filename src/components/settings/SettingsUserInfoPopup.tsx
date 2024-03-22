import Popup from '../ui/Popup'
import React from 'react'
import Input from '../ui/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/Button'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleUpdateUserInfo } from '../../store/appSlice'
import {
  UpdateUserInfoSchema,
  UpdateUserInfoType,
} from '../../app/validation/schemas/UpdateUserInfoSchema'
import {useUpdateUserMutation} from "../../store/api/user.api";

const SettingsUserInfoPopup: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOpened = useAppSelector(state => state.app.updateUserInfo)
  const [updateUser, {isLoading}] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInfoType>({ resolver: zodResolver(UpdateUserInfoSchema) })

  const onSubmit: SubmitHandler<UpdateUserInfoType> = data => {
    updateUser(data)
  }
  const onClose = () => {
    reset()
    dispatch(toggleUpdateUserInfo())
  }

  return (
    <Popup
      isOpened={isOpened}
      onClose={onClose}
      className="w-full mx-4 h-auto sm:m-0 sm:w-2/3 md:w-1/3 sm:h-auto"
    >
      <Popup.Header>Редагування інформації</Popup.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="firstName"
          type="text"
          placeholder="Введіть ім'я"
          error={errors?.firstName?.message}
          name="firstName"
          autoComplete="off"
          register={register}
          disabled={isLoading}
        />
        <Input
            id="lastName"
            type="text"
            placeholder="Введіть прізвище"
            error={errors?.lastName?.message}
            name="lastName"
            autoComplete="off"
            register={register}
            className="mt-2"
            disabled={isLoading}
        />
        <Button className="mt-6" loading={isLoading}>Оновити</Button>
      </form>
    </Popup>
  )
}

export default SettingsUserInfoPopup
