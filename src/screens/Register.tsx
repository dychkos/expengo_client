import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  RegisterSchema,
  RegisterSchemaType,
} from '../app/validation/schemas/RegisterSchema'
import { GoogleAuthBtn } from '../components/GoogleAuthBtn'
import Layout from '../components/layouts/Layout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAppSelector } from '../store'
import { useRegisterUserMutation } from '../store/api/auth.api'

const Register: React.FC = () => {
  const [registerUser, { isLoading, error: apiError }] = useRegisterUserMutation()
  const isAuth = useAppSelector(state => state.user.isAuthorized)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) })

  const onSubmit: SubmitHandler<RegisterSchemaType> = data => {
    registerUser(data)
  }

  return (
    <Layout className="flex justify-center items-center h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-default text-2xl font-bold sm:text-3xl">Вітаємо!</h1>

          <p className="font-default mt-4 text-gray-500">
            Ласкаво просимо в наш додаток для відстеження фінансових витрат! Будь ласка,
            авторизуйтесь, щоб отримати доступ до вашої фінансової інформації.
          </p>
        </div>

        <form
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Введіть ім'я"
            error={errors?.firstName?.message}
            name="firstName"
            register={register}
          />

          <Input
            type="text"
            placeholder="Введіть прізвище"
            error={errors?.lastName?.message}
            name="lastName"
            register={register}
          />

          <Input
            icon="MdOutlineAlternateEmail"
            id="login-email"
            type="email"
            placeholder="Введіть email"
            error={errors?.email?.message}
            name="email"
            register={register}
          />

          <Input
            icon="AiOutlineEye"
            id="login-password"
            type="password"
            placeholder="Введіть пароль"
            error={errors?.password?.message}
            name="password"
            autoComplete="off"
            register={register}
          />

          <div>
            {apiError && <span className="text-sm text-red-500">Error to be here</span>}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Вже маєте аккаунт?
              <NavLink to="/login" className="ml-1 underline">
                Увійти
              </NavLink>
              ;
            </p>

            <Button type="submit" loading={isLoading}>
              Створити аккаунт
            </Button>
          </div>
          <GoogleAuthBtn />
        </form>
      </div>
    </Layout>
  )
}

export default Register
