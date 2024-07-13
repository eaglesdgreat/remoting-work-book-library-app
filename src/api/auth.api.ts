import { IAuthResponseProps, IRegisterProps, ILoginProps } from 'types/api.type'

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