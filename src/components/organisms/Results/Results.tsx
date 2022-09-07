import { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useCurrentSavedRepositoriesStatus } from '../../../currentSavedRepositoriesContext'
import { CurrentStatusInterface, useCurrentStatus } from '../../../currentStateContext'
import { CurrentViewInterface, useCurrentView } from '../../../currentViewContext'
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

interface ResultsProps {
  currentState: CurrentStatusInterface
  currentView: CurrentViewInterface
}

export const Results = ({ currentState, currentView }: ResultsProps): ReactElement => {
  // View and fetch states
  const { fetchState } = useCurrentStatus()
  const { viewState } = useCurrentView()
  const { setSavedState } = useCurrentSavedRepositoriesStatus()

  // Language and repositories init
  const [language, setLanguage] = useState('')
  const { repositories, getRepositories } = useRepositoriesData()
  // TODO: Using an useEffect to just call it once, there's surely a better way to solve this.
  const useRepositories = () => {
    useEffect(() => {
      getRepositories(language)
    }, []) // eslint-disable-line
  }

  // Handle language change in the dropdown
  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>, language: string) => {
    setLanguage(event.target.value)
    RepositoriesResults(language)
  }

  // Init repositories
  const entries = repositories?.items || []

  // Get unique language list from Available Repositories
  const uniqueLanguages: string[] = []
  // TODO: Using a filter here, but I might be able to solve it more gracefully.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getUniqueLanguages = entries.filter((entry) => {
    const isDuplicate = entry.language && uniqueLanguages.includes(entry.language)

    if (!isDuplicate && entry.language !== null) {
      uniqueLanguages.push(entry.language)

      return true
    }

    return false
  })

  // Get available repositories length
  const availableRepositories = entries.filter((entry) => entry.language && entry.language.includes(language)).length

  // Get saved repositories
  const [savedRepositories, setSavedRepositories] = useLocalStorage<Array<RepositoryType>>('savedRepositories', [])

  // Check if current item is seleted
  const checkIsSaved = (entryId: number) => {
    const checkSavedRepositories = savedRepositories.filter((entry) => entry.id === entryId)
    return checkSavedRepositories.length > 0
  }

  // Remove saved item from saved items array
  const deleteSavedItem = (selectedItem: RepositoryType[], itemIndex: number) => {
    if (itemIndex > -1) {
      const updatedSavedRepositories = [...selectedItem]
      updatedSavedRepositories.splice(itemIndex, 1)
      return updatedSavedRepositories
    }
    return selectedItem
  }

  // Toggle save status on item and update save array status
  const toggleSave = (selectedItem: RepositoryType) => {
    const itemIndex = savedRepositories.findIndex((itemData) => itemData.id === selectedItem.id)

    const updatedSavedRepositories = checkIsSaved(selectedItem.id)
      ? deleteSavedItem(savedRepositories, itemIndex)
      : [selectedItem, ...savedRepositories]
    // TODO: Add aria-live to alert the user about the Saved Repository status
    setSavedRepositories(updatedSavedRepositories)
    updatedSavedRepositories.length > 0 ? setSavedState({ savedState: true }) : setSavedState({ savedState: false })
  }

  // Get saved repositories length
  const availableSavedRepositories = savedRepositories.length
  const useSavedRepositoriesStatus = () => {
    useEffect(() => {
      availableSavedRepositories > 0 ? setSavedState({ savedState: true }) : setSavedState({ savedState: false })
    }, [])
  }

  // Get repositories result items
  const RepositoriesResults = (language: string) => {
    return entries
      .filter((entry) => entry.language && entry.language.includes(language))
      .map((entry) => {
        return (
          <ResultsItem
            key={entry.id}
            repository={entry}
            onToggleSave={() => toggleSave(entry)}
            saved={checkIsSaved(entry.id)}
          />
        )
      })
  }

  // Get repositories saved results
  const SavedResults = () => {
    return savedRepositories.map((savedRepositoryEntry) => {
      return (
        <ResultsItem
          key={savedRepositoryEntry.id}
          repository={savedRepositoryEntry}
          onToggleSave={() => toggleSave(savedRepositoryEntry)}
          saved={checkIsSaved(savedRepositoryEntry.id)}
        />
      )
    })
  }

  // Fetch repositories and set initial saved repositories status
  useRepositories()
  useSavedRepositoriesStatus()

  return (
    <StyledResults>
      <StyledResultsInterface>
        <ResultsStatusLine
          currentState={fetchState.currentState}
          availableRepositories={availableRepositories}
          currentView={viewState.currentView}
          availableSavedRepositories={availableSavedRepositories}
          aria-label={`There are ${availableRepositories} available repositories.`}
          tab-index='3'
        />
        {currentView.currentView === CurrentView.PopularScreen &&
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
                aria-label="Select a language to filter the search results."
              >
                <option value='' aria-label="All languages are shown.">Any</option>
                {uniqueLanguages.map((language) => {
                  return (
                    <option key={language} value={language} aria-label={`Current language: ${language}.`}>
                      {language}
                    </option>
                  )
                })}
              </StyledLanguageDropdown>
            </StyledLanguageFilter>
          )}
      </StyledResultsInterface>
      <StyledResultsList>
        {currentView.currentView === CurrentView.PopularScreen ? RepositoriesResults(language) : SavedResults()}
      </StyledResultsList>
    </StyledResults>
  )
}
