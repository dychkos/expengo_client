import React from 'react'
import Layout from '../components/layouts/Layout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { GoogleAuthBtn } from '../components/GoogleAuthBtn'
import { NavLink } from 'react-router-dom'

const Register: React.FC = () => {
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

        <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <Input
            icon="MdOutlineAlternateEmail"
            id="login-email"
            type="email"
            placeholder="Введіть email"
          />

          <Input
            icon="AiOutlineEye"
            id="login-password"
            type="password"
            placeholder="Введіть пароль"
          />

          <Input
            icon="AiOutlineEye"
            id="login-confirm-password"
            type="password"
            placeholder="Повторіть пароль"
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Вже маєте аккаунт?
              <NavLink to="/login" className="ml-1 underline">
                Увійти
              </NavLink>
              ;
            </p>

            <Button type="submit">Створити аккаунт</Button>
          </div>
          <GoogleAuthBtn />
        </form>
      </div>
    </Layout>
  )
}

export default Register
