import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CurrentState } from './styles/variables'

export interface CurrentFetchState {
  currentState?: string
}

export const CurrentFetchContext = createContext({
  fetchState: {
    currentState: CurrentState.Default,
  } as CurrentFetchState,
  setFetchState: {} as Dispatch<SetStateAction<CurrentFetchState>>,
})

interface CurrentFetchStateProviderProps {
  children: React.ReactNode
  value?: CurrentFetchState
}

export const CurrentFetchStateProvider = ({
  children,
  value = {} as CurrentFetchState,
}: CurrentFetchStateProviderProps) => {
  const [fetchState, setFetchState] = useState(value)
  return <CurrentFetchContext.Provider value={{ fetchState, setFetchState }}>{children}</CurrentFetchContext.Provider>
}

export const useCurrentFetchState = () => {
  const context = useContext(CurrentFetchContext)
  if (!context) {
    throw new Error('useCurrentFetchState must be used within a CurrentStateContext')
  }
  return context
}

export const CurrentFetchCheckState = () => {
  const { fetchState } = useCurrentFetchState()
  return <span>{JSON.stringify(fetchState || {}, null, '\t')}</span>
}
