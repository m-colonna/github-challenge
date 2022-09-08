import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Home } from './components/pages/Home'
import { CurrentFetchStateProvider } from './currentFetchContext'
import { CurrentSavedStateProvider } from './currentSavedStateContext'
import { CurrentViewState, CurrentViewStateProvider } from './currentViewContext'
import { theme } from './styles/theme/default'
import { CurrentView } from './styles/variables'

function App() {
  const currentViewInterface: CurrentViewState = { currentView: CurrentView.TrendingView }
  return (
    // Current fetch/saved/view providers for global state management - Theme provider for theme usage through the styling
    <CurrentFetchStateProvider>
      <CurrentSavedStateProvider>
        <CurrentViewStateProvider value={currentViewInterface}>
          <ThemeProvider theme={theme}>
            <Home />
          </ThemeProvider>
        </CurrentViewStateProvider>
      </CurrentSavedStateProvider>
    </CurrentFetchStateProvider>
  )
}

export default App
