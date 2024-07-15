import { ILoginProps, IRegisterProps } from 'types'
// @ts-expect-error using alias as import so not an error
import { getUserSession, login, logout, register } from '@/api/auth.api';

// @ts-expect-error using alias as import so not an error
import { withAsync } from '@/helpers/withAsync';

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
