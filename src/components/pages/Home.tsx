import { ReactElement } from 'react'
import { useCurrentSavedRepositoriesStatus } from '../../currentSavedRepositoriesContext'
import { useCurrentStatus } from '../../currentStateContext'
import { useCurrentView } from '../../currentViewContext'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { Header } from '../organisms/Header/Header'
import { Results } from '../organisms/Results/Results'
import { StyledHome } from './Home.styles'

export const Home = (): ReactElement => {
  const { height } = useWindowDimensions()
  const { savedState } = useCurrentSavedRepositoriesStatus()
  const { fetchState } = useCurrentStatus()
  const { viewState } = useCurrentView()
  return (
    <StyledHome currentBrowserHeight={height}>
      <Header currentSavedStatus={savedState} currentView={viewState} />
      <Results currentState={fetchState} currentView={viewState} />
    </StyledHome>
  )
}
