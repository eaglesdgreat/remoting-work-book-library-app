// @ts-expect-error using alias as import so not an error
import { didAbort } from '@/api/api'
import { toast } from 'react-toastify'

export const handleAppError = (error: string) => {
  if (didAbort(error)) {
    toast.error('Request aborted due to too many requests!')
  } else {
    toast.error(error)
  }
}