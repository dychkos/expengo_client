import Popup from '../ui/Popup'
import React from 'react'
import Input from '../ui/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  UpdatePasswordSchema,
  UpdatePasswordType,
} from '../../app/validation/schemas/UpdatePasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/Button'
import { useAppDispatch, useAppSelector } from '../../store'
import { toggleUpdatePassword } from '../../store/appSlice'

const SettingsPasswordPopup: React.FC = () => {
  const dispatch = useAppDispatch()
  const isOpened = useAppSelector(state => state.app.updatePassword)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordType>({ resolver: zodResolver(UpdatePasswordSchema) })

  const onSubmit: SubmitHandler<UpdatePasswordType> = data => console.log(data)
  const onClose = () => {
    reset()
    dispatch(toggleUpdatePassword())
  }

  return (
    <Popup
      isOpened={isOpened}
      onClose={onClose}
      className="w-full mx-4 h-auto sm:m-0 sm:w-2/3 md:w-1/3 sm:h-auto"
    >
      <Popup.Header>Зміна паролю</Popup.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon="AiOutlineEye"
          id="update-password"
          type="password"
          placeholder="Введіть пароль"
          error={errors?.password?.message}
          name="password"
          autoComplete="off"
          register={register}
        />
        <Input
          icon="AiOutlineEye"
          id="confirm-password"
          type="password"
          placeholder="Введіть пароль"
          error={errors?.confirmPassword?.message}
          name="confirmPassword"
          autoComplete="off"
          register={register}
          className="mt-2"
        />

        <Button className="mt-6">Оновити</Button>
      </form>
    </Popup>
  )
}

export default SettingsPasswordPopup
