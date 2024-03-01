import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GoogleAuthBtn } from '../components/GoogleAuthBtn'
import Layout from '../components/layouts/Layout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAppSelector } from '../store'
import { useLoginUserMutation } from '../store/api/authApi'

const Login: React.FC = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const isAuth = useAppSelector(state => state.auth.isAuthorized)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  })

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    loginUser(loginData)
  }

  return (
    <Layout className="flex justify-center items-center h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="font-default text-2xl font-bold sm:text-3xl">З поверненням!</h1>

          <p className="font-default mt-4 text-gray-500">
            Ласкаво просимо в наш додаток для відстеження фінансових витрат! Будь ласка,
            авторизуйтесь, щоб отримати доступ до вашої фінансової інформації.
          </p>
        </div>

        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
          <Input
            icon="MdOutlineAlternateEmail"
            id="login-email"
            name="email"
            type="email"
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
    </Layout>
  )
}

export default Login
