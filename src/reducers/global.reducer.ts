import { GlobalItemActions, GlobalItemState } from './types/reducer.type'
// @ts-expect-error using alias as import so not an error
import { IBookResponseProps, IUserDataProps, Types } from '@/types';

export const reducer = (state: GlobalItemState, action: GlobalItemActions): GlobalItemState => {
  switch (action.type) {
    case Types.AddUser:
      state.user = action.payload as IUserDataProps
      break;

    case Types.Spinner:
      state.isSpinnerVisible = (action.payload as { show: boolean }).show;
      break;

    case Types.AddToken:
      window.localStorage.setItem('token', action.payload as string)
      break;

    case Types.RemoveToken:
      window.localStorage.removeItem(action.payload as string)
      break;

    case Types.GetToken:
      state.token = window.localStorage.getItem(action.payload as string);
      break;

    case Types.AddBooks:
      state.books = action.payload as IBookResponseProps[]
      break;
  }

  return state
}