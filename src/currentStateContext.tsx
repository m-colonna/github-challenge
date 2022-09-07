import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CurrentState } from './styles/variables'

export interface CurrentStatusInterface {
  currentState?: string
}

const CurrentStateContext = createContext({
  fetchState: {
    currentState: CurrentState.Default,
  } as CurrentStatusInterface,
  setFetchState: {} as Dispatch<SetStateAction<CurrentStatusInterface>>,
})

interface CurrentStatusProviderInterface {
  children: React.ReactNode
  value?: CurrentStatusInterface
}

const CurrentStatusProvider = ({ children, value = {} as CurrentStatusInterface }: CurrentStatusProviderInterface) => {
  const [fetchState, setFetchState] = useState(value)
  return <CurrentStateContext.Provider value={{ fetchState, setFetchState }}>{children}</CurrentStateContext.Provider>
}

const useCurrentStatus = () => {
  const context = useContext(CurrentStateContext)
  if (!context) {
    throw new Error('useCurrentStatus must be used within a CurrentStatusContext')
  }
  return context
}

const CurrentStatusCheckState = () => {
  const { fetchState } = useCurrentStatus()
  return <span>{JSON.stringify(fetchState || {}, null, '\t')}</span>
}

export { CurrentStatusProvider, useCurrentStatus, CurrentStatusCheckState }
