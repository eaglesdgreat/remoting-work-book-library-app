import { IAuthResponseProps, IRegisterProps } from "types/api.type"
import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from 'api/constants/api.status.constant';
import { useApiStatus } from 'api/hooks/api.status.hook'

import { registerUser } from 'services/auth.service';
import { useState } from 'react';

export const useRegisterUser = () => {
  const [user, setUser] = useState<IAuthResponseProps>();

  const {
    status: registerStatus,
    setStatus: setRegisterStatus,
    isIdle: isRegisterStatusIdle,
    isPending: isRegisterStatusPending,
    isError: isRegisterStatusError,
    isSuccess: isRegisterStatusSuccess,
    } = useApiStatus(IDLE)

  const initRegisterUser = async (payload: IRegisterProps) => {
    setRegisterStatus(PENDING);

    const {response, error} = await registerUser(payload);

    if (error) {
      setRegisterStatus(ERROR)
    } else if (response) {
      setUser(response.data);
      
      setRegisterStatus(SUCCESS);
    }
  }

  return {
    user,
    setRegisterStatus,
    initRegisterUser,
    registerStatus,
    isRegisterStatusIdle,
    isRegisterStatusPending,
    isRegisterStatusError,
    isRegisterStatusSuccess,
  }
}