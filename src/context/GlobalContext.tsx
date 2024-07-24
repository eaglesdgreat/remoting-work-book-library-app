// @ts-expect-error using alias as import so not an error
import { GlobalContextProviderProps, GlobalContextValue } from '@/types';
// @ts-expect-error using alias as import so not an error
import { GlobalItemActions, GlobalItemState } from '@/reducers/types/reducer.type'

import React from 'react'
import { contextFactory } from './helpers/contextFactory'
// @ts-expect-error using alias as import so not an error
import { reducer } from '@/reducers/global.reducer'
import { useImmerReducer } from 'use-immer'

const [
  GlobalContext,
  useGlobalContext,
  useGlobalContextSelector,
] = contextFactory<[GlobalItemState, React.Dispatch<GlobalItemActions>]>()

export { useGlobalContext, useGlobalContextSelector }

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

export default GlobalContextProvider;
