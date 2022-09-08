import styled from 'styled-components'
import DropdownArrow from '../../../assets/svg/dropdown-arrow.svg'
import { respondTo } from '../../../styles/helpers/respondTo'
import { MediaQuery } from '../../../styles/mediaQuery'
import { FontWeight } from '../../../styles/variables'

export const StyledResults = styled.div`
  flex-grow: 1;
  padding: 11rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${(props) => props.theme.color.lightGray};
  overflow-x: scroll;
  @media ${respondTo(MediaQuery.Medium)} {
    flex-direction: row;
    align-items: flex-start;
    padding-top: 8rem;
  }
`

export const StyledResultsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.8rem;
  @media ${respondTo(MediaQuery.Medium)} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-left: 22rem;
    width: calc(100% - 22rem);
  }
`

export const StyledResultsInterface = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 2rem;
  margin: 0 0 2rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.color.blackTint};
  gap: 2rem;
  width: 100%;
  @media ${respondTo(MediaQuery.Medium)} {
    border-bottom: 0 none;
    justify-content: flex-start;
    margin: 0;
    padding: 1rem 2rem 2rem 0;
    height: 100%;
    width: 20rem;
    position: fixed;
  }
`

export const StyledLanguageFilter = styled.div`
  display: flex;
  align-items: center;
  min-width: 100%;
  gap: 1rem;
  @media ${respondTo(MediaQuery.Medium)} {
    align-items: flex-start;
    flex-direction: column;
    border-top: 0.1rem solid ${(props) => props.theme.color.blackTint};
  }
`

export const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: ${FontWeight.Bold};
  @media ${respondTo(MediaQuery.Medium)} {
    margin-top: 2rem;
  }
`

export const StyledLanguageDropdown = styled.select<{ isDisabled: boolean }>`
  flex-grow: 1;
  border: 1px solid ${(props) => props.theme.color.blackTint};
  background-color: ${(props) => props.theme.color.lightGray};
  border-radius: 0.2rem;
  padding: 0 1rem;
  height: 4ch;
  color: ${(props) => props.theme.color.darkGray};
  font-weight: ${FontWeight.Bold};
  appearance: none;
  background-image: url(${DropdownArrow});
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  opacity: ${(props) => (props.isDisabled ? 0.1 : 1)};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'all')};
  transition: 0.25s ease all;

  &:focus-visible {
    outline: ${(props) => props.theme.color.apoOrange};
    border-color: ${(props) => props.theme.color.apoOrange};
  }

  @media ${respondTo(MediaQuery.Medium)} {
    width: 100%;
  }
`
