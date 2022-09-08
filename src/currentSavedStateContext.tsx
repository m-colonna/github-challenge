import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

export interface CurrentSavedState {
  savedState?: boolean
}

export const CurrentSavedStateContext = createContext({
  savedState: { savedState: false } as CurrentSavedState,
  setSavedState: {} as Dispatch<SetStateAction<CurrentSavedState>>,
})

interface CurrentSavedStateProviderProps {
  children: React.ReactNode
  value?: CurrentSavedState
}

export const CurrentSavedStateProvider = ({
  children,
  value = {} as CurrentSavedState,
}: CurrentSavedStateProviderProps) => {
  const [savedState, setSavedState] = useState(value)
  return (
    <CurrentSavedStateContext.Provider value={{ savedState, setSavedState }}>
      {children}
    </CurrentSavedStateContext.Provider>
  )
}

export const useCurrentSavedState = () => {
  const context = useContext(CurrentSavedStateContext)
  if (!context) {
    throw new Error('useCurrentrepository must be used within a CurrentStatusContext')
  }
  return context
}

export const CurrentSavedCheckState = () => {
  const { savedState } = useCurrentSavedState()
  return <span>{JSON.stringify(savedState || {}, null, '\t')}</span>
}
