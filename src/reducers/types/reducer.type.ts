import {
  GlobalContextValue,
  IBookResponseProps,
  IPaginationProps,
  IUserDataProps,
  Types
} from 'types';

export type GlobalItemState = GlobalContextValue

export type ToggleSpinner = (payload: {show: boolean}) => void

export type AddUser = (payload: {user: IUserDataProps}) => void

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

interface GlobalItemPayload {
  [Types.AddUser] : IUserDataProps
  [Types.Spinner] : {show: boolean}
  [Types.AddToken]: string
  [Types.RemoveToken]: string
  [Types.GetToken]: string
  [Types.AddBooks]: IBookResponseProps[]
  [Types.Pagination]: IPaginationProps
}

export type GlobalItemActions = ActionMap<GlobalItemPayload>[keyof ActionMap<GlobalItemPayload>];
