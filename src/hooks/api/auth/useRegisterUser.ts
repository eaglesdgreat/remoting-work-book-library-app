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
import { useGlobalContext } from '@/context/GlobalContext'
import { useState, useEffect } from 'react';

export const useRegisterUser = () => {
  const { dispatch } = useGlobalContext();
  const [status, setStatus] = useState<boolean>(false)

  const updateApiStatus = useApiStatus(IDLE, setStatus);

  const toggleSpinner = (show: boolean) => {
    dispatch({
      type: Types.Spinner,
      payload: {
        show
      }
    })
  }

  useEffect(() => toggleSpinner(status), [status])

  return async (payload: IRegisterProps) => {
    updateApiStatus(PENDING)

    const {response, error} = await registerUser(payload);

    if (error) {
      updateApiStatus(ERROR)

      handleAppError(error.message)
    } else if (response) {      
      updateApiStatus(SUCCESS)

      toast.success('Account created!')

      return response.data;
    }
  }
}