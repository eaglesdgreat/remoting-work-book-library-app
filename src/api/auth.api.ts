// @ts-expect-error using alias as import so not an error
import { IAuthResponseProps, IRegisterProps, ILoginProps } from '@/types'

import api from './api';

const URLS = {
  login: 'login',
  logout: 'logout',
  register: 'register',
  session: 'session'
}

export const register = (body: IRegisterProps) => {
  return api.post<IAuthResponseProps>(URLS.register, body)
}

export const login = (body: ILoginProps) => {
  return api.post<IAuthResponseProps>(URLS.login, body)
}

export const logout = () => {
  return api.post<IAuthResponseProps>(URLS.logout, {})
}

export const getUserSession = () => {
  return api.get<IAuthResponseProps>(URLS.session)
}