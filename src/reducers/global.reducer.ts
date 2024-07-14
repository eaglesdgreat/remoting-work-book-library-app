import { GlobalItemState, GlobalItemActions } from './types/reducer.type'

export const reducer = (state: GlobalItemState, action: GlobalItemActions): GlobalItemState => {
  switch (action.type) {
    case 'ADD_USER':
      state.user = action.payload
      break

    case 'TOGGLE_SPINNER':
      state.isSpinnerVisible = action.payload.show;
      break
  }

  return state
}