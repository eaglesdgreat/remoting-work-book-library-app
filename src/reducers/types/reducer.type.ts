import { GlobalContextValue, IUserDataProps } from 'types';

export type GlobalItemState = GlobalContextValue

export type ToggleSpinner = (payload: {show: boolean}) => void

export type AddUser = (payload: {user: IUserDataProps}) => void

export interface ReducerAction<T, P> {
  type: T
  payload: P
}

export type GlobalItemActions =
  | ReducerAction<'ADD_USER', IUserDataProps>
  | ReducerAction<'TOGGLE_SPINNER', {show: boolean}>
  | ReducerAction<'ADD_TOKEN', string>
  | ReducerAction<'REMOVE_TOKEN', string>