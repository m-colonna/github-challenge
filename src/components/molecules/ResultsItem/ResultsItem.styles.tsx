import styled from 'styled-components'
import { respondTo } from '../../../styles/helpers/respondTo'
import { MediaQuery } from '../../../styles/mediaQuery'
import { FontWeight } from '../../../styles/variables'

export const StyledResultsItem = styled.li<{
  isSaved?: boolean
}>`
  display: flex;
  background: ${(props) => props.theme.color.white};
  list-style-type: none;
  width: 100%;
  overflow: hidden;
  border: 0.1rem solid ${(props) => props.theme.color.blackTint};
  height: 11.2rem;
  transition: 0.2s ease all;
  @media ${respondTo(MediaQuery.Large)} {
    max-width: calc(50% - 0.8rem);
    height: 12rem;
  }
  @media ${respondTo(MediaQuery.XLarge)} {
    max-width: calc(25% - 0.8rem);
  }
  &:active{
    transform: scale(0.98);
    transition: 0.1s ease all;
  }
`

export const StyledFavButton = styled.button<{ isSaved?: boolean }>`
  min-height: 100%;
  min-width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.isSaved ? props.theme.color.apoBlueTint : props.theme.color.lightGrayTint)};
  border: none;
  transition: 0.3s ease-in all;
  -webkit-tap-highlight-color: transparent;

  svg {
    height: 3rem;
    fill: ${(props) => (props.isSaved ? props.theme.color.apoOrange : props.theme.color.apoBlueTint)};
    stroke: ${(props) => (props.isSaved ? props.theme.color.apoOrange : props.theme.color.apoBlueTint)};
    transform: scale(${(props) => (props.isSaved ? '1' : '.8')});
    stroke-width: 2rem;
    transition: 0.15s fill ease, 0.15s stroke ease, 0.15s transform ease;
  }

  &:focus-visible {
    outline: none;
    background-color: ${(props) => props.theme.color.apoOrangeTint};
    transition: 0.25s ease all;
  }
  
  @media ${respondTo(MediaQuery.Large)} {
    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.color.apoBlueTint};
    }
  }
`

export const StyledResultsInfo = styled.a`
  padding: 1.4rem;
  width: calc(100% - 5rem);
  background: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 0 none;
  overflow: hidden;
  text-decoration: none;
  color: ${(props) => props.theme.color.darkGray};

  &:focus-visible {
    outline: none;
    background-color: ${(props) => props.theme.color.apoOrangeTint};
  }
`

export const StyledSecondLineItem = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.color.apoBlueTint};
  width: fit-content;
  padding: 0.6rem 0.6rem;
  border-radius: 0.4rem;

  svg {
    width: 1rem;
    fill: ${(props) => props.theme.color.apoOrange};
  }
}`

export const StyledSecondLineText = styled.span`
  height: 0.8rem;
  font-size: 0.8rem;
  font-weight: ${FontWeight.Bold};
  color: ${(props) => props.theme.color.darkGray};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 20ch;
  @media ${respondTo(MediaQuery.Medium)} {
    font-size: 1rem;
  }
`

export const StyledResultsInfoSecondLine = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`

export const StyledLanguageItem = styled.p`
  display: flex;
  gap: 0.4rem;

  &::before {
    content: '';
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    background: ${(props) => props.theme.color.apoRed};
    border-radius: 50%;
  }
`

export const StyledRepositoryName = styled.h3`
  color: ${(props) => props.theme.color.apoBlue};
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.4rem;
  @media ${respondTo(MediaQuery.Medium)} {
    font-size: 1.6rem;
  }
`

export const StyledRepositoryLink = styled.h4`
  font-size: 1rem;
  font-weight: normal;
  width: 100%;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media ${respondTo(MediaQuery.Medium)} {
    font-size: 1.1rem;
  }
`

export const StyledRepositoryDescription = styled.span`
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 1rem 0;
  flex-grow: 1;
  @media ${respondTo(MediaQuery.Medium)} {
    font-size: 1.1rem;
    margin: 1rem 0 0;
    line-height: 1.24;
  }
`
