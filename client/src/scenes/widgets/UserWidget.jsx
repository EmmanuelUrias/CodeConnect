import {
    ManageAccountsOutlined,
    EditOutLined,
    LocationOnOutLined,
    WorkOutLinedOutLined
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from '@mui/material'
import UserImg from 'components/UserImgWidget'
import FlexBetween from 'components/FlexBetween'
import WidgetWrap from 'components/WidgetWrap'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const { palette } = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async () => {
        const res = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = res.json()
        setUser(data)
    }
    useEffect(() => { // when you render widget the api call is made once
        getUser()
    }, [])

    if (!user) {
        return null
    }

    const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user

    return (
        <WidgetWrap>
            {/* First Row */}
            <FlexBetween gap='0.5rem' pb='1.1rem' onClick={() => navigate(`profile/${userId}`)}>
                <FlexBetween gap='1rem'>
                    <UserImg image={picturePath}/>
                    <Box>
                        <Typography variant='h4' color={dark} fontWeight='500' sx={{ '&:hover': { color: palette.primary.light, cursor: 'pointer' }}}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>
                <Divider />
            </FlexBetween>

        </WidgetWrap>
    )

}