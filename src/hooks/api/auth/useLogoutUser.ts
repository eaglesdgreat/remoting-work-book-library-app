import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from 'api/constants/api.status.constant';
import { logoutUser } from 'services/auth.service';
import { useApiStatus } from 'api/hooks/api.status.hook'

export const useLogoutUser = () => {
  const {
    status: logoutStatus,
    setStatus: setLogoutStatus,
    isIdle: isLogoutStatusIdle,
    isPending: isLogoutStatusPending,
    isError: isLogoutStatusError,
    isSuccess: isLogoutStatusSuccess,
    } = useApiStatus(IDLE)

  const initLogoutUser = async () => {
    setLogoutStatus(PENDING);

    const {response, error} = await logoutUser();

    if (error) {
      setLogoutStatus(ERROR)
    } else if (response) {
      setLogoutStatus(SUCCESS);
    }
  }

  return {
    setLogoutStatus,
    initLogoutUser,
    logoutStatus,
    isLogoutStatusIdle,
    isLogoutStatusPending,
    isLogoutStatusError,
    isLogoutStatusSuccess,
  }
}