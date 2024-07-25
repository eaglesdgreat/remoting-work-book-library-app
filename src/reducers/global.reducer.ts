import { GlobalItemActions, GlobalItemState } from './types/reducer.type'
// @ts-expect-error using alias as import so not an error
import { IBookResponseProps, IUserDataProps, Types } from '@/types';

export const reducer = (state: GlobalItemState, action: GlobalItemActions) => {
  switch (action.type) {
    case Types.AddUser:
      return { ...state, user: action.payload as IUserDataProps };

    case Types.Spinner:
      return { ...state, isSpinnerVisible: (action.payload as { show: boolean }).show };

    case Types.AddToken:
      window.localStorage.setItem('token', action.payload as string)
      break;

    case Types.RemoveToken:
      window.localStorage.removeItem(action.payload as string)
      break;

    case Types.GetToken:
      return { ...state, token: window.localStorage.getItem(action.payload as string) };

    case Types.AddBooks:
      return { ...state, books: action.payload as IBookResponseProps[] };

    default:
      return state;
  }
}