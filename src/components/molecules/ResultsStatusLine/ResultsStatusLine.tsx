import { ReactElement } from 'react'
import { CurrentState, CurrentView } from '../../../styles/variables'
import { StyledErrorHeading, StyledHeading } from './ResultsStatusLine.styles'

interface ResultsStatusLineProps {
  currentState?: string
  availableRepositories: number
  currentView?: string
  availableSavedRepositories: number
}

export const ResultsStatusLine = ({
  currentState,
  availableRepositories,
  availableSavedRepositories,
  currentView,
}: ResultsStatusLineProps): ReactElement => {
  return (
    <>
      <StyledHeading>
        {currentState === CurrentState.Loading ? (
          'Loading...'
        ) : currentView === CurrentView.PopularScreen ? (
          availableRepositories && availableRepositories !== 0 ? (
            <>
              {/* TODO: Change repositories/repository when available repositories is 1 */}
              <b>{availableRepositories}</b> available repositories
            </>
          ) : (
            'No repositories found.'
          )
        ) : availableSavedRepositories && availableSavedRepositories !== 0 ? (
          <>
            {/* TODO: Change repositories/repository when available repositories is 1 */}
            <b>{availableSavedRepositories}</b> saved repositories
          </>
        ) : (
          'No repositories saved yet.'
        )}
      </StyledHeading>
      {currentState === CurrentState.Error && (
        <StyledErrorHeading>
          Sorry, we couldn't reach the repository list.
          <br />
          Please check your connection and try again.
        </StyledErrorHeading>
      )}
    </>
  )
}
