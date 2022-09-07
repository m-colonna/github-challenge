import styled from 'styled-components'

export const StyledFooter = styled.div`
  height: 3rem;
  max-height: 150px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${(props) => props.theme.color.gray};
  position: fixed;
  bottom: 0;
  width: calc(100% - 4rem);
`

export const StyledFooterDescription = styled.span`
  color: ${(props) => props.theme.color.darkGray};
  font-size: 0.8rem;
`
