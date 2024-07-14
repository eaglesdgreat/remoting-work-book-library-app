import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from 'api/constants/api.status.constant';
import { IAuthResponseProps, ILoginProps } from "types"
import { loginUser } from 'services/auth.service';
import { useState } from 'react';
import { useApiStatus } from 'api/hooks/api.status.hook'

export const useLoginUser = () => {
  const [user, setUser] = useState<IAuthResponseProps>();

  const {
    status: loginStatus,
    setStatus: setLoginStatus,
    isIdle: isLoginStatusIdle,
    isPending: isLoginStatusPending,
    isError: isLoginStatusError,
    isSuccess: isLoginStatusSuccess,
    } = useApiStatus(IDLE)

  const initLoginUser = async (payload: ILoginProps) => {
    setLoginStatus(PENDING);

    const {response, error} = await loginUser(payload);

    if (error) {
      setLoginStatus(ERROR)
    } else if (response) {
      setUser(response.data);

      setLoginStatus(SUCCESS);
    }
  }

  return {
    user,
    setLoginStatus,
    initLoginUser,
    loginStatus,
    isLoginStatusIdle,
    isLoginStatusPending,
    isLoginStatusError,
    isLoginStatusSuccess,
  }
}