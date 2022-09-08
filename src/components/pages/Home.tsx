import { ReactElement } from 'react'
import { useCurrentFetchState } from '../../currentFetchContext'
import { useCurrentSavedState } from '../../currentSavedStateContext'
import { useCurrentViewState } from '../../currentViewContext'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { Header } from '../organisms/Header/Header'
import { Results } from '../organisms/Results/Results'
import { StyledHome } from './Home.styles'

export const Home = (): ReactElement => {
  // Passing the current window height to set dynamic full height for blank states
  const { height } = useWindowDimensions()
  const { savedState } = useCurrentSavedState()
  const { fetchState } = useCurrentFetchState()
  const { viewState } = useCurrentViewState()
  return (
    <StyledHome currentBrowserHeight={height}>
      <Header currentSavedrepository={savedState} currentView={viewState} />
      <Results currentState={fetchState} currentView={viewState} />
    </StyledHome>
  )
}
