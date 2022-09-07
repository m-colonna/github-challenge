import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Home } from './components/pages/Home'
import { CurrentSavedRepositoriesProvider } from './currentSavedRepositoriesContext'
import { CurrentStatusProvider } from './currentStateContext'
import { CurrentViewInterface, CurrentViewProvider } from './currentViewContext'
import { theme } from './styles/theme/default'
import { CurrentView } from './styles/variables'

function App() {
  const currentViewInterface: CurrentViewInterface = { currentView: CurrentView.PopularScreen }
  return (
    <CurrentStatusProvider>
      <CurrentSavedRepositoriesProvider>
        <CurrentViewProvider value={currentViewInterface}>
          <ThemeProvider theme={theme}>
            <Home />
          </ThemeProvider>
        </CurrentViewProvider>
      </CurrentSavedRepositoriesProvider>
    </CurrentStatusProvider>
  )
}

export default App
