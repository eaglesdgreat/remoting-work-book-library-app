import React from 'react'
// @ts-expect-error using alias as import so not an error
import { GlobalContextValue, GlobalContextProviderProps } from '@/types';
import { useImmerReducer } from 'use-immer'
import { contextFactory } from './helpers/contextFactory'
// @ts-expect-error using alias as import so not an error
import { reducer } from '@/reducers/global.reducer'
// @ts-expect-error using alias as import so not an error
import { GlobalItemState, GlobalItemActions } from '@/reducers/types/reducer.type'

const [
  GlobalContext,
  useGlobalContext,
  useGlobalContextSelector,
] = contextFactory<[GlobalItemState, React.Dispatch<GlobalItemActions>]>()

// export { useGlobalContext, useGlobalContextSelector }

const globalItems: GlobalContextValue = {
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
  token: "",
}

const GlobalContextProvider = (props: GlobalContextProviderProps) => {
  const [globalData, dispatch] = useImmerReducer(reducer, globalItems)

  return (
    <GlobalContext.Provider value={[globalData, dispatch]}>
      {props.children}    
    </GlobalContext.Provider>
  )
}

GlobalContextProvider.useGlobalContext = useGlobalContext;
GlobalContextProvider.useGlobalContextSelector = useGlobalContextSelector;

export default GlobalContextProvider;
