import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CurrentView } from './styles/variables'

export interface CurrentViewInterface {
  currentView?: string
}

const CurrentViewContext = createContext({
  viewState: {
    currentView: CurrentView.PopularScreen,
  } as CurrentViewInterface,
  setViewState: {} as Dispatch<SetStateAction<CurrentViewInterface>>,
})

interface CurrentViewProviderInterface {
  children: React.ReactNode
  value?: CurrentViewInterface
}

const CurrentViewProvider = ({ children, value = {} as CurrentViewInterface }: CurrentViewProviderInterface) => {
  const [viewState, setViewState] = useState(value)
  return <CurrentViewContext.Provider value={{ viewState, setViewState }}>{children}</CurrentViewContext.Provider>
}

const useCurrentView = () => {
  const context = useContext(CurrentViewContext)
  if (!context) {
    throw new Error('useCurrentView must be used within a CurrentViewContext')
  }
  return context
}

const CurrentViewCheckState = () => {
  const { viewState } = useCurrentView()
  return <span>{JSON.stringify(viewState || {}, null, '\t')}</span>
}

export { CurrentViewProvider, useCurrentView, CurrentViewCheckState }
