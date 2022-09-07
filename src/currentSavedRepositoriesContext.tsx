import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

export interface CurrentSavedRepositoriesInterface {
  savedState?: boolean
}

const CurrentSavedRepositoriesContext = createContext({
  savedState: { savedState: false } as CurrentSavedRepositoriesInterface,
  setSavedState: {} as Dispatch<SetStateAction<CurrentSavedRepositoriesInterface>>,
})

interface CurrentSavedRepositoriesProviderInterface {
  children: React.ReactNode
  value?: CurrentSavedRepositoriesInterface
}

const CurrentSavedRepositoriesProvider = ({
  children,
  value = {} as CurrentSavedRepositoriesInterface,
}: CurrentSavedRepositoriesProviderInterface) => {
  const [savedState, setSavedState] = useState(value)
  return (
    <CurrentSavedRepositoriesContext.Provider value={{ savedState, setSavedState }}>
      {children}
    </CurrentSavedRepositoriesContext.Provider>
  )
}

const useCurrentSavedRepositoriesStatus = () => {
  const context = useContext(CurrentSavedRepositoriesContext)
  if (!context) {
    throw new Error('useCurrentStatus must be used within a CurrentStatusContext')
  }
  return context
}

const CurrentSavedCheckState = () => {
  const { savedState } = useCurrentSavedRepositoriesStatus()
  return <span>{JSON.stringify(savedState || {}, null, '\t')}</span>
}

export { CurrentSavedRepositoriesProvider, useCurrentSavedRepositoriesStatus, CurrentSavedCheckState }
