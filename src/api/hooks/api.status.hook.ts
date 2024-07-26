import { useState, useMemo, useEffect } from 'react'
import { IDLE, defaultApiStatuses } from '../constants/api.status.constant'
import { ApiStatus } from "../types/api.type";

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const prepareStatuses = (currentStatus: ApiStatus): Statuses => {
  const statuses = {} as Statuses

  for (const status of defaultApiStatuses) {
    const normalizedStatus = capitalize(status.toLowerCase())

    const normalizedStatusKey = `is${normalizedStatus}` as keyof Statuses

    statuses[normalizedStatusKey] = status === currentStatus
  }

  return statuses
}

export const useApiStatus = (currentStatus: ApiStatus = IDLE, setLoaderStatus: (status: boolean) => void) => {
  const [status, setStatus] = useState<ApiStatus>(currentStatus)

  const statuses = useMemo(() => prepareStatuses(status), [status])

  useEffect(() => {
    setLoaderStatus(statuses.isPending)
  }, [statuses]);

  return (updatedStatus: ApiStatus) => {
    setStatus(updatedStatus);
  }
}