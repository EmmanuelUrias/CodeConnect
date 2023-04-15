import { Box } from '@mui/material'
import { styled } from '@mui/system'

const FlexBetween = styled(Box)({ // Box allows me to use css properties on the component (only works for box)
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

export default FlexBetween