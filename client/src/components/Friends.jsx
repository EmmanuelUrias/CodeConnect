import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined"
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { setFriends } from 'state'
import FlexBetween from './FlexBetween'
import UserImg from "./UserImgWidget"
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined"
import { useNavigate } from "react-router-dom"

const Friends = ({ friendId, name, location, userPicturePath }) => {
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)
    const primaryLight = palette.primary.light
    const primaryDark = palette.primary.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    const isFriends = friends.find((friend) => friend._id === friendId)

    const addAndRemoveFriend = async () => {
        const res = await fetch(`http://localhost:3002/users/${_id}/${friendId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `The chosen ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        dispatch(setFriends({ friends: data }))
    }

    return (
        <FlexBetween>
            <FlexBetween>
                <UserImg image={userPicturePath} size='55px'/>
                <Box onClick={() => { navigate(`profile/${friendId}`); navigate(0) }}> {/* the second navigate rerenders the page to stop the page from not rerendering the page when someone repeadadly clicks on friends */}
                    <Typography color={main} variant='h5' fontWeight='500' sx={{ marginLeft: '8px', '&:hover': { color: palette.primary.light, cursor: 'pointer' }}}>
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize='0.75rem' marginLeft='10px'>
                        {location}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton onClick={() => addAndRemoveFriend()} sx={{ backgroundColor: primaryLight, p: '0.6rem' }}>
                {isFriends ? (
                    <PersonRemoveOutlinedIcon sx={{ color: primaryDark }}/>
                ): (
                    <PersonAddOutlinedIcon sx={{ color: primaryDark }}/>
                )}
            </IconButton>
        </FlexBetween>
    )
}

export default Friends