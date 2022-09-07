import { ReactElement } from 'react'
import { RepositoryType } from '../../../utils/repositories.types'
import { Icon } from '../../atoms/Icon/Icon'
import {
  StyledFavButton,
  StyledLanguageItem,
  StyledRepositoryDescription,
  StyledRepositoryLink,
  StyledRepositoryName,
  StyledResultsInfo,
  StyledResultsInfoSecondLine,
  StyledResultsItem,
  StyledSecondLineItem,
  StyledSecondLineText,
} from './ResultsItem.styles'

interface ResultsItemProps {
  saved?: boolean
  repository: RepositoryType
  onToggleSave: () => void
}

export const ResultsItem = ({ repository, saved, onToggleSave }: ResultsItemProps): ReactElement => {

  const SavedCounterAriaLabel = `This repository was saved ${repository.stargazers_count} times.`
  const LanguageAriaLabel = `This repository uses ${repository.language} language.`
  const RepositoryNameAriaLabel = `Repository name: ${repository.name}.`
  const RepositoryDescriptionAriaLabel = `Repository description: ${repository.description}.`
  const SaveButtonAriaLabel = `Save ${repository.name} on your Saved Repositories list.`
  const DeleteButtonAriaLabel = `Remove ${repository.name} from your Saved Repositories list.`
  const LicenceAriaLabel = `This repository uses ${repository.license?.name}.`

  return (
    <StyledResultsItem aria-label="Repository item" isSaved={saved}>
      <StyledResultsInfo href={repository.html_url} target='_blank'>
        <StyledRepositoryName aria-label={RepositoryNameAriaLabel}>{repository.name}</StyledRepositoryName>
        <StyledRepositoryLink aria-hidden="true">{repository.html_url}</StyledRepositoryLink>
        <StyledRepositoryDescription aria-label={RepositoryDescriptionAriaLabel}>{repository.description}</StyledRepositoryDescription>
        <StyledResultsInfoSecondLine>
          <StyledSecondLineItem>
            <Icon.Star />
            <StyledSecondLineText aria-label={SavedCounterAriaLabel}>{repository.stargazers_count}</StyledSecondLineText>
          </StyledSecondLineItem>
          {repository.language && (
            <StyledSecondLineItem aria-label={LanguageAriaLabel}>
              <StyledLanguageItem>
                <StyledSecondLineText>{repository.language}</StyledSecondLineText>
              </StyledLanguageItem>
            </StyledSecondLineItem>
          )}
          {repository.license && (
            <StyledSecondLineItem aria-label={LicenceAriaLabel}>
              <StyledSecondLineText>{repository.license.name}</StyledSecondLineText>
            </StyledSecondLineItem>
          )}
        </StyledResultsInfoSecondLine>
      </StyledResultsInfo>
      <StyledFavButton aria-label={saved ? DeleteButtonAriaLabel : SaveButtonAriaLabel} isSaved={saved} onClick={onToggleSave}>
        <Icon.Star />
      </StyledFavButton>
    </StyledResultsItem>
  )
}
