import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from '../../../api/constants/api.status.constant';
// @ts-expect-error using alias as import so not an error
import { ILoginProps, Types } from "@/types"

// @ts-expect-error using alias as import so not an error
import { handleAppError } from '@/helpers/handleAppError'
// @ts-expect-error using alias as import so not an error
import { loginUser } from '@/services/auth.service';
import { toast } from 'react-toastify'
// @ts-expect-error using alias as import so not an error
import { useApiStatus } from '@/api/hooks/api.status.hook'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'

export const useLoginUser = () => {
  const { dispatch } = useGlobalContext();

  const {
    setStatusWithCallback: setLoginStatus,
  } = useApiStatus(IDLE);

  const toggleSpinner = (show: boolean) => {
    dispatch({
      type: Types.Spinner,
      payload: {
        show
      }
    })
  }

  return async (payload: ILoginProps) => {
    await setLoginStatus(PENDING, (show) => {
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