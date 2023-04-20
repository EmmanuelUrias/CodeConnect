import { Typography, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import WidgetWrap from "components/WidgetWrap"

const AdWidget = () => {
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    return (
        <WidgetWrap>
            <FlexBetween>
                <Typography color={dark} variant='h5' fontWeight='500'>
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Create Ad
                </Typography>
            </FlexBetween>
            <img width='100%' height='auto' alt='Advertisement' src='http://localhost:3001/assets/info4.jpeg' style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}/>
            <FlexBetween>
                <Typography color={main}>
                    Cosmetics
                </Typography>
                <Typography color={medium}>cosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m='0.5rem 0'>
                Best make up in the market
            </Typography>
        </WidgetWrap>
    )
}

export default AdWidget