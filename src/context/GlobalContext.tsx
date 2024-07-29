// @ts-expect-error using alias as import so not an error
import { Dispatch, reducer } from '@/reducers/global.reducer'
// @ts-expect-error using alias as import so not an error
import { GlobalContextProviderProps, GlobalContextValue } from '@/types';
// @ts-expect-error using alias as import so not an error
import { GlobalItemActions, GlobalItemState } from '@/reducers/types/reducer.type'

import { contextFactory } from './helpers/contextFactory'
import { useReducer } from 'react'

const initialState: GlobalContextValue = {
  isSpinnerVisible: false,
  user: {
    id: 0,
    name: '',
    email: '',
    username: '',
    created_at: '',
    updated_at: ''
  },
  books: [],
  token: '',
  paginationInfo: {
    count: '',
    currentPage: '',
    hasMorePages: false,
    lastPage: '',
    perPage: '',
    total: '',
  }
}

const [useGlobalContext, GlobalContext] = contextFactory<GlobalItemState, Dispatch<GlobalItemActions>>(initialState);

export { useGlobalContext }

const GlobalContextProvider = (props: GlobalContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const context = { state, dispatch };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}    
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
