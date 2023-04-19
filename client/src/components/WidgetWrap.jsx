import { Box } from '@mui/material'
import { styled } from '@mui/material'

const WidgetWrap = styled(Box) (({ theme }) => ({
    padding: '1.5rem 1.5rem 0.76rem 1.4rem',
    backgroundColor: theme.palette.background.alt,
    borderRadius: '0.74rem'
}))

export default WidgetWrap