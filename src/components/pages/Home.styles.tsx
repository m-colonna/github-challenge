import styled from 'styled-components'
import { FontFamily } from '../../styles/variables'

export const StyledHome = styled.div<{
  currentBrowserHeight: number
}>`
  min-height: ${(props) => props.currentBrowserHeight}px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: ${(props) => props.theme.color.white};
  font-family: ${FontFamily.Main};
  color: ${(props) => props.theme.color.darkGray};
`
