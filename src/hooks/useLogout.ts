import { removeToken } from '../app/utils'
import { useAppDispatch } from '../store'
import { logout as logoutInStore } from '../store/authSlice'

export const useLogout = () => {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutInStore())
    removeToken()
  }

  return {
    logout,
  }
}
