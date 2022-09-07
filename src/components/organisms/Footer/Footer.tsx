import { ReactElement } from 'react'
import { CurrentSavedCheckState } from '../../../currentSavedRepositoriesContext'
import { CurrentStatusCheckState } from '../../../currentStateContext'
import { CurrentViewCheckState } from '../../../currentViewContext'
import { StyledFooter, StyledFooterDescription } from './Footer.styles'

export const Footer = (): ReactElement => {
  return (
    <StyledFooter>
      <StyledFooterDescription>
        {CurrentSavedCheckState()} | {CurrentViewCheckState()} | {CurrentStatusCheckState()}
      </StyledFooterDescription>
    </StyledFooter>
  )
}
