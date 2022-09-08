import { ReactElement } from 'react'
import { CurrentFetchCheckState } from '../../../currentFetchContext'
import { CurrentSavedCheckState } from '../../../currentSavedStateContext'
import { CurrentViewCheckState } from '../../../currentViewContext'
import { StyledFooter, StyledFooterDescription } from './Footer.styles'

// Debug footer
export const Footer = (): ReactElement => {
  return (
    <StyledFooter>
      <StyledFooterDescription>
        {CurrentSavedCheckState()} | {CurrentViewCheckState()} | {CurrentFetchCheckState()}
      </StyledFooterDescription>
    </StyledFooter>
  )
}
