// @ts-expect-error using alias as import so not an error
import { IRegisterProps, Types } from "@/types"
import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
} from '../../../api/constants/api.status.constant';
import { useApiStatus } from '../../../api/hooks/api.status.hook'
import { toast } from 'react-toastify'
// @ts-expect-error using alias as import so not an error
import { handleAppError } from '@/helpers/handleAppError'
// @ts-expect-error using alias as import so not an error
import { registerUser } from '@/services/auth.service';
// @ts-expect-error using alias as import so not an error
import { useGlobalContextSelector } from '@/context/GlobalContext'

export const useRegisterUser = () => {
  const dispatch = useGlobalContextSelector((ctx) => ctx[1]);

  const {
    setStatusWithCallback: setRegisterStatus,
  } = useApiStatus(IDLE);

  const toggleSpinner = (show: boolean) => {
    dispatch({
      type: Types.Spinner,
      payload: {
        show
      }
    })
  }

  return async (payload: IRegisterProps) => {
    setRegisterStatus(PENDING, (show) => {
      toggleSpinner(show);
    });

    const {response, error} = await registerUser(payload);

    console.log('data', response, error)

    if (error) {
      setRegisterStatus(ERROR, (show) => {
        toggleSpinner(show);
      })

      handleAppError(error.message)
    } else if (response) {      
      setRegisterStatus(SUCCESS, (show) => {
        toggleSpinner(show);
      });

      toast.success('Account created!')

      return response.data;
    }
  }
}