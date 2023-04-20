import { Box, Typography, useTheme } from '@mui/material'
import Friends from 'components/Friends'
import WidgetWrap from 'components/WidgetWrap'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state'
import { useEffect } from 'react'

const FriendListWidget = ({ userId }) => {
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const friends = useSelector((state) => state.user.friends)
    const token = useSelector((state) => state.token)
    
    const getFriends = async () => {
        const res = await fetch(`http://localhost:3001/users/${userId}/friends`, {
            method: 'GET',
            headers : { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends()
    }, [])

    return (
        <WidgetWrap>
            <Typography color={palette.neutral.dark} variant='h5' fontWeight='500' sx={{ mb: '1.5rem' }}>
                Friends
            </Typography>
            <Box display='flex' flexDirection='column' gap='1.5rem'>
                {friends.map((friend) => (
                    <Friends
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastname}`}
                        description={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrap>
    )
}

export default FriendListWidget