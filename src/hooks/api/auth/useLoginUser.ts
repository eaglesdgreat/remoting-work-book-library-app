import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from '../../../api/constants/api.status.constant';
import { ILoginProps } from "types"
import { toast } from 'react-toastify'
// @ts-expect-error using alias as import so not an error
import { handleAppError } from '@/helpers/handleAppError'

// @ts-expect-error using alias as import so not an error
import { loginUser } from '@/services/auth.service';
// @ts-expect-error using alias as import so not an error
import { useApiStatus } from '@/api/hooks/api.status.hook'
// @ts-expect-error using alias as import so not an error
import { useGlobalContextSelector } from '@/context/GlobalContext'

export const useLoginUser = () => {
  const dispatch = useGlobalContextSelector((ctx) => ctx[1]);

  const {
    setStatusWithCallback: setLoginStatus,
  } = useApiStatus(IDLE);

  const toggleSpinner = (show: boolean) => {
    dispatch({
      type: 'TOGGLE_SPINNER',
      payload: {
        show
      }
    })
  }

  return async (payload: ILoginProps) => {
    setLoginStatus(PENDING, (show) => {
      toggleSpinner(show);
    });

    const {response, error} = await loginUser(payload);

    if (error) {
      setLoginStatus(ERROR, (show) => {
        toggleSpinner(show);
      })

      handleAppError(error.message)
    } else if (response) {
      setLoginStatus(SUCCESS, (show) => {
        toggleSpinner(show);
      });

      toast.success('Welcome back!')

      return response.data
    }
  }
}