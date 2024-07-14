import React from 'react'
import Spinner from '@/components/LazyLoader';
import { GlobalContextValue, GlobalContextProviderProps } from '@/types';
import { ToastContainer } from 'react-toastify'
import { useImmerReducer } from 'use-immer'
import { contextFactory } from './helpers/contextFactory'
import { reducer } from '@/reducers/global.reducer'
import { GlobalItemState, GlobalItemActions } from '@/reducers/types/reducer.type'

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
  }
}

const GlobalContextProvider = (props: GlobalContextProviderProps) => {
  const [globalData, dispatch] = useImmerReducer(reducer, globalItems)

  return (
    <GlobalContext.Provider value={[globalData, dispatch]}>
      <ToastContainer />

      {props.children}
    
      <Spinner show={false} />
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider;
