import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GoogleAuthBtn } from '../components/GoogleAuthBtn'
import Layout from '../components/layouts/Layout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAppSelector } from '../store'
import { useRegisterUserMutation } from '../store/api/authApi'

const Register: React.FC = () => {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation()
  const isAuth = useAppSelector(state => state.auth.isAuthorized)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const [registerData, setRegisterData] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    registerUser(registerData)
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

        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input
              type="text"
              name="firstName"
              placeholder="Введіть ім'я"
              onInput={handleInput}
            />

            <Input
              type="text"
              name="lastName"
              placeholder="Введіть прізвище"
              onInput={handleInput}
            />
          </div>

          <Input
            icon="MdOutlineAlternateEmail"
            id="login-email"
            type="email"
            name="email"
            placeholder="Введіть email"
            onInput={handleInput}
          />

          <Input
            icon="AiOutlineEye"
            id="login-password"
            type="password"
            name="password"
            placeholder="Введіть пароль"
            onInput={handleInput}
          />

          <div>
            {error && <span className="text-sm text-red-500">Something went wrong.</span>}
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
