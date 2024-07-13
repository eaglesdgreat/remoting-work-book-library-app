import { withAsync } from 'helpers/withAsync';
import { login, logout, register, getUserSession } from 'api/auth.api';
import { IRegisterProps, ILoginProps } from 'types/api.type'

export async function registerUser(payload: IRegisterProps) {
  const { response, error } = await withAsync(() => register(payload));

  return {
    response,
    error
  }
}

export async function loginUser(payload: ILoginProps) {
  const { response, error } = await withAsync(() => login(payload));

  return {
    response,
    error
  }
}

export async function logoutUser() {
  const { response, error } = await withAsync(() => logout());

  return {
    response,
    error
  }
}

export async function getUser() {
  const { response, error } = await withAsync(() => getUserSession());

  return {
    response,
    error
  }
}
