import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { LoginSchema, LoginSchemaType } from '../app/validation/schemas/LoginSchema'
import { GoogleAuthBtn } from '../components/GoogleAuthBtn'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAppSelector } from '../store'
import { useLoginUserMutation } from '../store/api/auth.api'

const Login: React.FC = () => {
  const [loginUser, { isLoading, error: apiError }] = useLoginUserMutation()
  const isAuth = useAppSelector(state => state.user.isAuthorized)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })

  const onSubmit: SubmitHandler<LoginSchemaType> = data => {
    loginUser(data)
  }

  return (
    <main className="flex justify-center items-center h-screen px-4 md:px-0 pt-24 mx-auto w-full sm:w-3/4 xl:w-2/4">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-default text-2xl font-bold sm:text-3xl">З поверненням!</h1>

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
            icon="MdOutlineAlternateEmail"
            id="login-email"
            name="email"
            type="email"
            placeholder="Введіть email"
            error={errors.email?.message}
            register={register}
          />

          <Input
            icon="AiOutlineEye"
            id="login-password"
            type="password"
            name="password"
            placeholder="Введіть пароль"
            error={errors.password?.message}
            register={register}
          />

          <div>
            {apiError && <span className="text-sm text-red-500">Error to be here</span>}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Вперше тут?
              <NavLink className="ml-1 underline" to="/register">
                Реєстрація
              </NavLink>
            </p>

            <Button type="submit" loading={isLoading}>
              Увійти
            </Button>
          </div>
          <GoogleAuthBtn />
        </form>
      </div>
    </main>
  )
}

export default Login
