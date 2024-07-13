import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from 'api/constants/api.status.constant';
import { ApiStatus } from "api/types/api.status.type"
import { IAuthResponseProps, ILoginProps } from "types/api.type"
import { loginUser } from 'services/auth.service';
import { useState } from 'react';

export const useLoginUser = () => {
  const [user, setUser] = useState<IAuthResponseProps>();
  const [apiStatus, setApiStatus] = useState<ApiStatus>(IDLE);

  const initLoginUser = async (payload: ILoginProps) => {
    setApiStatus(PENDING);

    const {response, error} = await loginUser(payload);

    if (error) {
      setApiStatus(ERROR)
    } else if (response) {
      setUser(response.data);

      setApiStatus(SUCCESS);
    }
  }

  return {
    user,
    apiStatus,
    initLoginUser
  }
}