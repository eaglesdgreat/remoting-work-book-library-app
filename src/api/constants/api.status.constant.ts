import { ApiStatus, ApiStatuses } from "../types/api.status.type";

export const IDLE: ApiStatus = 'IDLE'
export const PENDING: ApiStatus = 'PENDING'
export const SUCCESS: ApiStatus = 'SUCCESS'
export const ERROR: ApiStatus = 'ERROR'

export const defaultApiStatuses: ApiStatus[] = [
  'IDLE',
  'PENDING',
  'SUCCESS',
  'ERROR',
]

export const apiStatus: ApiStatuses = {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
}