import React, { ReactElement } from 'react'
import { CurrentSavedState } from '../../../currentSavedStateContext'
import { CurrentViewState, useCurrentViewState } from '../../../currentViewContext'
import { CurrentView } from '../../../styles/variables'
import { Icon } from '../../atoms/Icon/Icon'
import {
  StyledCategoriesList,
  StyledCategoryItem,
  StyledCategoryName,
  StyledHeader,
  StyledSubHeader,
  StyledTopHeader,
  StyledTopLogo,
} from './Header.styles'

interface HeaderProps {
  currentView: CurrentViewState
  currentSavedrepository: CurrentSavedState
}

export const Header = ({ currentView, currentSavedrepository }: HeaderProps): ReactElement => {
  // Init current view state
  const { setViewState } = useCurrentViewState()

  // Set current view on button interaction
  const setCurrentView = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const targetButton: HTMLButtonElement = event.currentTarget
    setViewState({ currentView: targetButton.value })
  }

  // Set ARIA labels for interactive elements audio support
  const PopularViewTabLabel = 'Tab selector, most popular section'
  const SavedViewTabLabel = 'Tab selector, saved section'

  return (
    <StyledHeader>
      <StyledTopHeader>
        {/* TODO: Integrate scrollTop */}
        <StyledTopLogo>
          <Icon.GithubLogo />
        </StyledTopLogo>
      </StyledTopHeader>

      <StyledSubHeader>
        <StyledCategoriesList>
          <StyledCategoryItem>
            <StyledCategoryName
              value={CurrentView.TrendingView}
              onClick={setCurrentView}
              isActive={currentView.currentView === CurrentView.TrendingView}
              tabIndex={1}
              aria-label={PopularViewTabLabel}
            >
              Most Popular
            </StyledCategoryName>
          </StyledCategoryItem>
          <StyledCategoryItem>
            <StyledCategoryName
              value={CurrentView.SavedView}
              onClick={setCurrentView}
              isActive={currentView.currentView === CurrentView.SavedView}
              disabled={currentSavedrepository.savedState === false}
              tabIndex={2}
              aria-label={SavedViewTabLabel}
            >
              Saved Repositories
            </StyledCategoryName>
          </StyledCategoryItem>
        </StyledCategoriesList>
      </StyledSubHeader>
    </StyledHeader>
  )
}
