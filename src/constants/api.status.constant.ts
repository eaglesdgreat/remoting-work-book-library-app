import { ApiStatus } from "types/api.type";

export const IDLE: ApiStatus = "IDLE";
export const PENDING: ApiStatus = "PENDING";
export const SUCCESS: ApiStatus = "SUCCESS";
export const ERROR: ApiStatus = "ERROR";

export type ApiStatuses = Record<ApiStatus, ApiStatus>

export const apiStatus: ApiStatuses = {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR
};
