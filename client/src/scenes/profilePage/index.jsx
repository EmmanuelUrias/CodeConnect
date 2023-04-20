import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import MakePostWidget from 'scenes/widgets/MakePostWidget'
import FriendListWidget from 'scenes/widgets/FriendsWidget'
import PostFeedWidget from 'scenes/widgets/PostFeedWidget'
import Navbar from 'scenes/navbar'
import UserWidget from 'scenes/widgets/UserWidget'

const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

    const getUser = async () => {
        const res = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = res.json()
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    if (!user) return null

    return (
    <Box>
        <Navbar />
        <Box width='100%' padding='2rem 7%' display={isNonMobileScreens ? 'flex' : 'block'} gap='2.5rem' justifyContent='center'>
            <Box flexBasis={isNonMobileScreens ? '27%' : undefined}>
                <UserWidget userId={userId} picturePath={user.picturePath}/>
                <Box m='2.2rem 0'/>
                    <FriendListWidget userId={userId}/>
            </Box>
            <Box flexBasis={isNonMobileScreens ? '43%' : undefined} mt={isNonMobileScreens ? undefined : '2rem'}>
                <MakePostWidget picturePath={user.picturePath}/>
                <Box m='2.2rem 0'/>
                <MakePostWidget userId={userId} isProfile/>
            </Box>
        </Box>
    </Box>
    )
}

export default ProfilePage