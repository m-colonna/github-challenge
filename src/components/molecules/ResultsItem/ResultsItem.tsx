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
  return (
    <StyledResultsItem isSaved={saved}>
      <StyledResultsInfo href={repository.html_url} target='_blank'>
        <StyledRepositoryName>{repository.name}</StyledRepositoryName>
        <StyledRepositoryLink>{repository.html_url}</StyledRepositoryLink>
        <StyledRepositoryDescription>{repository.description}</StyledRepositoryDescription>
        <StyledResultsInfoSecondLine>
          <StyledSecondLineItem>
            <Icon.Star />
            <StyledSecondLineText>{repository.stargazers_count}</StyledSecondLineText>
          </StyledSecondLineItem>
          {repository.language && (
            <StyledSecondLineItem>
              <StyledLanguageItem>
                <StyledSecondLineText>{repository.language}</StyledSecondLineText>
              </StyledLanguageItem>
            </StyledSecondLineItem>
          )}
          {repository.license && (
            <StyledSecondLineItem>
              <StyledSecondLineText>{repository.license.name}</StyledSecondLineText>
            </StyledSecondLineItem>
          )}
        </StyledResultsInfoSecondLine>
      </StyledResultsInfo>
      <StyledFavButton isSaved={saved} onClick={onToggleSave}>
        <Icon.Star />
      </StyledFavButton>
    </StyledResultsItem>
  )
}
