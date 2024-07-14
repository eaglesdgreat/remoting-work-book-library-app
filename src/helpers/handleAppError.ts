import { toast } from 'react-toastify'
import { didAbort } from '@/api/api'

export const handleAppError = (error: unknown) => {
  if (didAbort(error)) {
    toast.error('Request aborted!')
  } else {
    toast.error('Oops, error!')
  }
}