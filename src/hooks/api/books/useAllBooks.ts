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
import { useGlobalContextSelector } from '@/context/GlobalContext'
// @ts-expect-error using alias as import so not an error
import { getAllBooksService } from '@/services/books.service';

export const useAllBooks = () => {
  const dispatch = useGlobalContextSelector((ctx) => ctx[1]);

  const {
    setStatusWithCallback: setBookStatus,
  } = useApiStatus(IDLE);

  const toggleSpinner = (show: boolean) => {
    dispatch({
      type: Types.Spinner,
      payload: {
        show
      }
    })
  }

  return async (params: PaginationParamsProps) => {
    setBookStatus(PENDING, (show) => {
      toggleSpinner(show);
    });

    const {response, error} = await getAllBooksService(params);

    if (error) {
      setBookStatus(ERROR, (show) => {
        toggleSpinner(show);
      })

      handleAppError(error.message)
    } else if (response) {
      setBookStatus(SUCCESS, (show) => {
        toggleSpinner(show);
      });

      toast.success('Welcome back!')

      return response.data
    }
  }
}