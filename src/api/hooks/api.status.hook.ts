import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { IDLE, defaultApiStatuses } from '../constants/api.status.constant'
import { ApiStatus } from "../types/api.type";

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const prepareStatuses = (currentStatus: ApiStatus): Statuses => {
  const statuses = {} as Statuses

  for (const status of defaultApiStatuses) {
    const normalisedStatus = capitalize(status.toLowerCase())

    const normalisedStatusKey = `is${normalisedStatus}` as keyof Statuses

    statuses[normalisedStatusKey] = status === currentStatus
  }

  return statuses
}

export const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
  const callbackRef = useRef<null | Function>(null);

  const [status, setStatus] = useState<ApiStatus>(currentStatus)

  const statuses = useMemo(() => prepareStatuses(status), [status])

  useEffect(() => {
    if (callbackRef.current) {
      setTimeout(() => {
        callbackRef.current?.(statuses.isPending);
        callbackRef.current = null;
      }, 1000);
    }
  }, [status, statuses]);


  const setStatusWithCallback = useCallback((newValue, callback) => {
    callbackRef.current = callback;
    setStatus(newValue);
  }, []);

  return {
    status,
    setStatusWithCallback,
    ...statuses,
  }
}