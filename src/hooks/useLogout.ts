import { removeToken } from '../app/utils'
import { useAppDispatch } from '../store'
import { api } from '../store/api/api'
import { logout as logoutInStore } from '../store/userSlice'
import {toInitialApp} from "../store/appSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutInStore())
    dispatch(toInitialApp())
    dispatch(api.util.resetApiState())

    removeToken()
  }

  return {
    logout,
  }
}
