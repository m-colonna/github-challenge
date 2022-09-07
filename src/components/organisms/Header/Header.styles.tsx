import styled from 'styled-components'
import { respondTo } from '../../../styles/helpers/respondTo'
import { MediaQuery } from '../../../styles/mediaQuery'
import { FontWeight, zIndex } from '../../../styles/variables'

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  background: ${(props) => props.theme.color.lightGray};
  z-index: ${zIndex.Navigation};
  box-shadow: 0 0 0.5rem ${(props) => props.theme.color.blackTint};
  @media ${respondTo(MediaQuery.Medium)} {
    flex-direction: row-reverse;
    align-items: flex-end;
    justify-content: space-between;
  }
`

export const StyledTopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 2rem);
  box-shadow: 0 0 0.5rem ${(props) => props.theme.color.blackTint};
  background: ${(props) => props.theme.color.lightGray};
  padding: 1rem;
  z-index: ${zIndex.Navigation};
  @media ${respondTo(MediaQuery.Medium)} {
    width: auto;
    padding-right: 4rem;
    box-shadow: none;
  }
`

export const StyledTopButton = styled.a`
  svg {
    height: 3rem;
  }
`

export const StyledSubHeader = styled.div`
  background: ${(props) => props.theme.color.lightGray};
  padding: 0;
  max-width: 100vw;
  @media ${respondTo(MediaQuery.Medium)} {
    width: auto;
    padding-left: 0.5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const StyledCategoriesList = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0;
  margin: 0;
  max-width: 100%;
  @media ${respondTo(MediaQuery.Medium)} {
    height: 100%;
  }
`

export const StyledCategoryItem = styled.ul`
  padding: 0;
  margin: 0;
  @media ${respondTo(MediaQuery.Medium)} {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const StyledCategoryName = styled.button<{ isActive?: boolean; isDisabled?: boolean }>`
  background: none;
  color: ${(props) => props.theme.color.darkGray};
  padding: 1rem 1rem 0.8rem;
  width: 15rem;
  border-width: 0;
  border-style: none;
  border-bottom: ${(props) =>
    props.isActive ? '0.2rem solid' + props.theme.color.apoBlue : '0.2rem solid' + props.theme.color.blackTint};
  font-weight: ${FontWeight.Bold};
  transition: all 0.5s ease-out;
  pointer-events: ${(props) => (props.isActive ? 'none' : 'all')};

  ${(props) => props.disabled && 'opacity: .25; border-color: #fafafa; pointer-events: none;'}
  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    outline: none;
    border-color: ${(props) => props.theme.color.apoOrange};
    transtion: 0.1s ease all;
  }

  @media ${respondTo(MediaQuery.Medium)} {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
