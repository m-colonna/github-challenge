import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CurrentView } from './styles/variables'

export interface CurrentViewState {
  currentView?: string
}

export const CurrentViewContext = createContext({
  viewState: {
    currentView: CurrentView.TrendingView,
  } as CurrentViewState,
  setViewState: {} as Dispatch<SetStateAction<CurrentViewState>>,
})

interface CurrentViewStateProviderProps {
  children: React.ReactNode
  value?: CurrentViewState
}

export const CurrentViewStateProvider = ({
  children,
  value = {} as CurrentViewState,
}: CurrentViewStateProviderProps) => {
  const [viewState, setViewState] = useState(value)
  return <CurrentViewContext.Provider value={{ viewState, setViewState }}>{children}</CurrentViewContext.Provider>
}

export const useCurrentViewState = () => {
  const context = useContext(CurrentViewContext)
  if (!context) {
    throw new Error('useCurrentView must be used within a CurrentViewContext')
  }
  return context
}

export const CurrentViewCheckState = () => {
  const { viewState } = useCurrentViewState()
  return <span>{JSON.stringify(viewState || {}, null, '\t')}</span>
}
