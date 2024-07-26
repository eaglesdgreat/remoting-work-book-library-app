import {
  ERROR,
  IDLE,
  PENDING,
  SUCCESS,
// @ts-expect-error using alias as import so not an error
} from '@/api/constants/api.status.constant';
import { toast } from 'react-toastify'
// @ts-expect-error using alias as import so not an error
import { handleAppError } from '@/helpers/handleAppError'
// @ts-expect-error using alias as import so not an error
import { PaginationParamsProps, Types } from '@/types'
// @ts-expect-error using alias as import so not an error
import { useApiStatus } from '@/api/hooks/api.status.hook'
// @ts-expect-error using alias as import so not an error
import { useGlobalContext } from '@/context/GlobalContext'
// @ts-expect-error using alias as import so not an error
import { getAllBooksService } from '@/services/books.service';
import { useState, useEffect } from 'react';

export const useGetAllBooks = () => {
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

  return async (params: PaginationParamsProps) => {
    updateApiStatus(PENDING)

    const {response, error} = await getAllBooksService(params);

    if (error) {
      updateApiStatus(ERROR)
      
      handleAppError(error.message)

      return error;
    } else if (response) {
      updateApiStatus(SUCCESS)

      toast.success('Welcome back!')

      return response.data
    }
  }
}