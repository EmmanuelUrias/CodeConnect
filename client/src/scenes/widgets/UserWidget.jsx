import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import EditOutLinedIcon from '@mui/icons-material/EditOutlined'
import LocationOnOutLinedIcon from '@mui/icons-material/LocationOnOutlined'
import WorkOutLineOutLinedIcon from '@mui/icons-material/WorkOutlineOutlined'
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

    const getUserData = async () => {
        try {
            const res = await fetch(`http://localhost:3002/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `The chosen ${token}` }
        })
        const user = await res.json()
        setUser(user)
        
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => { // when you render widget the api call is made once
        getUserData()
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
                </FlexBetween>
                <ManageAccountsOutlinedIcon />
                </FlexBetween>

                <Divider />

                {/* Second Row */}
                <Box p='1rem 0'>
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <LocationOnOutLinedIcon fontSize='large' sx={{ color: main }}/>
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap='1rem'>
                        <WorkOutLineOutLinedIcon fontSize='large' sx={{ color: main }}/>
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>

                <Divider />

                {/* Third Row */}
                <Box p='1rem 0'>
                    <FlexBetween mb='0.5rem'>
                        <Typography color={medium}>Who's viewed your profile</Typography>
                        <Typography color={main} fontWeight='500'>{viewedProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween>
                        <Typography color={medium}>Impressions of your post</Typography>
                        <Typography color={main} fontWeight='500'>{impressions}</Typography>
                    </FlexBetween>
                </Box>
                
                <Divider />

                {/* Fourth Row */}
                <Box p='1rem 0'>
                    <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
                        Social Profiles
                    </Typography>

                    {/* Twitter Icon */}
                    <FlexBetween gap='1rem' mb='0.5rem'>
                        <FlexBetween gap='1rem'>
                            <img src='../assets/twitter.png' alt='twitter'/>
                            <Box>
                                <Typography color={main} fontWeight='500'>
                                    Twitter
                                </Typography>
                                <Typography color={medium}>
                                    Social Network
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutLinedIcon sx={{ color: main }}/>
                    </FlexBetween>

                    {/* Linkedin Icon */}
                    <FlexBetween gap='1rem'>
                        <FlexBetween gap='1rem'>
                            <img src='../assets/linkedin.png' alt='linkedin'/>
                            <Box>
                                <Typography color={main} fontWeight='500'>
                                    Linkedin
                                </Typography>
                                <Typography color={medium}>
                                    Network Platform
                                </Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutLinedIcon sx={{ color: main }}/>
                    </FlexBetween>
                </Box>

        </WidgetWrap>
    )

}

export default UserWidget