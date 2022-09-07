import React, { ReactElement } from 'react'
import { CurrentSavedRepositoriesInterface } from '../../../currentSavedRepositoriesContext'
import { CurrentViewInterface, useCurrentView } from '../../../currentViewContext'
import { CurrentView } from '../../../styles/variables'
import { Icon } from '../../atoms/Icon/Icon'
import {
  StyledCategoriesList,
  StyledCategoryItem,
  StyledCategoryName,
  StyledHeader,
  StyledSubHeader,
  StyledTopButton,
  StyledTopHeader,
} from './Header.styles'

interface HeaderProps {
  currentView: CurrentViewInterface
  currentSavedStatus: CurrentSavedRepositoriesInterface
}

export const Header = ({ currentView, currentSavedStatus }: HeaderProps): ReactElement => {
  const { setViewState } = useCurrentView()
  const setCurrentView = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const targetButton: HTMLButtonElement = event.currentTarget
    setViewState({ currentView: targetButton.value })
  }

  return (
    <StyledHeader>
      <StyledTopHeader>
        {/* TODO: Integrate scrollTop */}
        <StyledTopButton onClick={() => {}}>
          <Icon.GithubLogo />
        </StyledTopButton>
      </StyledTopHeader>

      <StyledSubHeader>
        <StyledCategoriesList>
          <StyledCategoryItem>
            <StyledCategoryName
              value={CurrentView.PopularScreen}
              onClick={setCurrentView}
              isActive={currentView.currentView === CurrentView.PopularScreen}
              tabIndex={1}
            >
              Most Popular
            </StyledCategoryName>
          </StyledCategoryItem>
          <StyledCategoryItem>
            <StyledCategoryName
              value={CurrentView.SavedScreen}
              onClick={setCurrentView}
              isActive={currentView.currentView === CurrentView.SavedScreen}
              disabled={currentSavedStatus.savedState === false}
              tabIndex={2}
            >
              Saved Repositories
            </StyledCategoryName>
          </StyledCategoryItem>
        </StyledCategoriesList>
      </StyledSubHeader>
    </StyledHeader>
  )
}
