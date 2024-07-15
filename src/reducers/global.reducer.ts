import { GlobalItemState, GlobalItemActions } from './types/reducer.type'

export const reducer = (state: GlobalItemState, action: GlobalItemActions): GlobalItemState => {
  switch (action.type) {
    case 'ADD_USER':
      state.user = action.payload
      break

    case 'TOGGLE_SPINNER':
      state.isSpinnerVisible = action.payload.show;
      break

    case 'ADD_TOKEN':
      window.localStorage.setItem('token', action.payload)
      break

    case 'REMOVE_TOKEN':
      window.localStorage.removeItem(action.payload)
      break
  }

  return state
}