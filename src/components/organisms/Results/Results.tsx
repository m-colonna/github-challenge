import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { CurrentFetchState, useCurrentFetchState } from '../../../currentFetchContext'
import { useCurrentSavedState } from '../../../currentSavedStateContext'
import { CurrentViewState, useCurrentViewState } from '../../../currentViewContext'
import { useRepositoriesData } from '../../../hooks/useRepositoriesData'
import { CurrentState, CurrentView } from '../../../styles/variables'
import { RepositoryType } from '../../../utils/repositories.types'
import { ResultsItem } from '../../molecules/ResultsItem/ResultsItem'
import { ResultsStatusLine } from '../../molecules/ResultsStatusLine/ResultsStatusLine'
import {
  StyledLabel,
  StyledLanguageDropdown,
  StyledLanguageFilter,
  StyledResults,
  StyledResultsInterface,
  StyledResultsList,
} from './Results.styles'

interface StateProps {
  currentState: CurrentFetchState
  currentView: CurrentViewState
}

export const Results = ({ currentState, currentView }: StateProps): ReactElement => {
  // View and fetch global states
  const { fetchState } = useCurrentFetchState()
  const { viewState } = useCurrentViewState()
  const { setSavedState } = useCurrentSavedState()

  // Init local language state
  const [language, setLanguage] = useState('')

  // Init repositories
  const { repositories, getRepositories } = useRepositoriesData()
  // TODO: Using an useEffect to just call it once, there's surely a better way to solve this.
  const useRepositories = () => {
    useEffect(() => {
      getRepositories(language)
    }, []) // eslint-disable-line
  }
  const trendingRepositories = repositories?.items || []

  // Init saved repositories
  const [savedRepositories, setSavedRepositories] = useLocalStorage<Array<RepositoryType>>('savedRepositories', [])

  // Handle language change in the dropdown
  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>, language: string) => {
    setLanguage(event.target.value)
    RepositoriesResults(language)
  }

  // Get unique language list from the available trending repositories
  const uniqueLanguages: string[] = []
  // TODO: Using a filter here, but I might be able to solve it more gracefully (without disabling eslint at least).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUniqueLanguages = trendingRepositories.filter((repository) => {
    const isDuplicate = repository.language && uniqueLanguages.includes(repository.language)

    if (!isDuplicate && repository.language !== null) {
      uniqueLanguages.push(repository.language)

      return true
    }

    return false
  })

  // Get available trending repositories length
  const availableRepositoriesCount = trendingRepositories.filter(
    (repository) => repository.language && repository.language.includes(language)
  ).length

  // Check if current repository is saved
  const checkIsSaved = (repositoryId: number) => {
    const checkSavedRepositories = savedRepositories.filter((repository) => repository.id === repositoryId)
    return checkSavedRepositories.length > 0
  }

  // Remove saved repository from saved repository array
  const deleteSavedItem = (selectedRepository: RepositoryType[], repositoryIndex: number) => {
    if (repositoryIndex > -1) {
      const updatedSavedRepositories = [...selectedRepository]
      updatedSavedRepositories.splice(repositoryIndex, 1)
      return updatedSavedRepositories
    }
    return selectedRepository
  }

  // Toggle save repository on item and update save array repository
  const toggleSave = (selectedRepository: RepositoryType) => {
    const repositoryIndex = savedRepositories.findIndex((repository) => repository.id === selectedRepository.id)

    const updatedSavedRepositories = checkIsSaved(selectedRepository.id)
      ? deleteSavedItem(savedRepositories, repositoryIndex)
      : [selectedRepository, ...savedRepositories]

    // TODO: Add aria-live to alert the user about the Saved Repository repository

    setSavedRepositories(updatedSavedRepositories)
    updatedSavedRepositories.length > 0 ? setSavedState({ savedState: true }) : setSavedState({ savedState: false })
  }

  // Get saved repositories length
  const availableSavedRepositories = savedRepositories.length
  const useSavedState = () => {
    useEffect(() => {
      availableSavedRepositories > 0 ? setSavedState({ savedState: true }) : setSavedState({ savedState: false })
    }, [])
  }

  // Show trending repositories items
  const RepositoriesResults = (language: string) => {
    return trendingRepositories
      .filter((repository) => repository.language && repository.language.includes(language))
      .map((repository) => {
        return (
          <ResultsItem
            key={repository.id}
            repository={repository}
            onToggleSave={() => toggleSave(repository)}
            saved={checkIsSaved(repository.id)}
          />
        )
      })
  }

  // Show saved repositories results
  const SavedResults = () => {
    return savedRepositories.map((savedRepository) => {
      return (
        <ResultsItem
          key={savedRepository.id}
          repository={savedRepository}
          onToggleSave={() => toggleSave(savedRepository)}
          saved={checkIsSaved(savedRepository.id)}
        />
      )
    })
  }

  // Set ARIA labels for interactive elements audio support
  const ResultsStatusLineLabel = `There are ${availableRepositoriesCount} available repositories.`
  const LanguageDropdownLabel = 'Select a language to filter the search results.'
  const LanguageOptionLabel = `Current language: ${language}.`
  const AnyLanguageLabel = 'All languages are shown.'

  // Fetch repositories and set initial saved repositories repository
  useRepositories()
  useSavedState()

  return (
    <StyledResults>
      <StyledResultsInterface>
        <ResultsStatusLine
          currentState={fetchState.currentState}
          availableRepositories={availableRepositoriesCount}
          currentView={viewState.currentView}
          availableSavedRepositories={availableSavedRepositories}
          aria-label={ResultsStatusLineLabel}
          tab-index='3'
        />
        {currentView.currentView === CurrentView.TrendingView &&
          currentState !== CurrentState.Error &&
          uniqueLanguages.length > 0 && (
            <StyledLanguageFilter>
              <StyledLabel>Language</StyledLabel>
              <StyledLanguageDropdown
                isDisabled={fetchState.currentState === CurrentState.Loading}
                value={language}
                onChange={(event) => {
                  changeLanguage(event, language)
                }}
                aria-label={LanguageDropdownLabel}
              >
                <option value='' aria-label={AnyLanguageLabel}>
                  Any
                </option>
                {uniqueLanguages.map((language) => {
                  return (
                    <option key={language} value={language} aria-label={LanguageOptionLabel}>
                      {language}
                    </option>
                  )
                })}
              </StyledLanguageDropdown>
            </StyledLanguageFilter>
          )}
      </StyledResultsInterface>
      <StyledResultsList>
        {currentView.currentView === CurrentView.TrendingView ? RepositoriesResults(language) : SavedResults()}
      </StyledResultsList>
    </StyledResults>
  )
}
