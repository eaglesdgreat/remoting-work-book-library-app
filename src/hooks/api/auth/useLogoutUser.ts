import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from 'api/constants/api.status.constant';
import { ApiStatus } from "api/types/api.status.type"
import { logoutUser } from 'services/auth.service';
import { useState } from 'react';

export const useLogoutUser = () => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>(IDLE);

  const initLogoutUser = async () => {
    setApiStatus(PENDING);

    const {response, error} = await logoutUser();

    if (error) {
      setApiStatus(ERROR)
    } else if (response) {
      setApiStatus(SUCCESS);
    }
  }

  return {
    apiStatus,
    initLogoutUser
  }
}