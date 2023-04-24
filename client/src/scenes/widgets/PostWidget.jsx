import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShapeLineOutlined"
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from "components/FlexBetween"
import Friends from 'components/Friends'
import WidgetWrap from "components/WidgetWrap"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPost } from 'state'

const PostWidget = ({ postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments }) => {
const [isCommentsOpen, setIsCommentsOpen] = useState(false)
const dispatch = useDispatch()
const loggedInUserId = useSelector((state) => state.user._id)
const token = useSelector((state) => state.token)
const isLiked = Boolean(likes[loggedInUserId]) // the likes are an object storing all the userIds that have liked and will simply check if the current userId has liked and return true or false
const likeCount = Object.keys(likes).length
const { palette } = useTheme()
const primary = palette.primary.main
const main = palette.neutral.main

const addOrRemoveLikes = async () => {
    const res = await fetch(`http://localhost:3002/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
            Authorization: `The chosen ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: loggedInUserId })
    })
    const updatedPostLikes = await res.json()
    dispatch(setPost({ post: updatedPostLikes }))
}

return (
    <WidgetWrap m='2rem 0'>
        <Friends friendId={postUserId} name={name} location={location} userPicturePath={userPicturePath} sx={{marginLeft: '5px'}}/>
        <Typography color={main} sx={{ mt: '1rem' }}>
            {description}
        </Typography>
        {picturePath && (
            <img width='100%' height='auto' alt={`${name}'s post`} style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }} src={`http://localhost:3001/assets/${picturePath}`}/>
        )}
        <FlexBetween mt='0.23rem'>
            <FlexBetween gap='0.98rem'>
                <FlexBetween gap='0.35rem'>
                    <IconButton onClick={addOrRemoveLikes}>
                        {isLiked ? (
                            <FavoriteOutlinedIcon sx={{ color: primary }}/>
                        ) : (
                            <FavoriteBorderOutlinedIcon />
                        )}
                    </IconButton>
                    <Typography>
                        {likeCount}
                    </Typography>
                </FlexBetween>
                <FlexBetween gap='0.35rem'>
                    <IconButton onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                    <Typography>{comments.length}</Typography>
                </FlexBetween>
            </FlexBetween>
            <IconButton>
                <ShareOutlinedIcon />
            </IconButton>
        </FlexBetween>
        {isCommentsOpen && (
            <Box mt='0.55rem'>
                {comments.map((comment, index) => (
                    <Box key={`${name}-${index}`}>
                        <Divider/>
                        <Typography sx={{ color: main, m: '0.55rem 0', pl: '1rem' }}>
                            {comment}
                        </Typography>
                    </Box>
                ))}
                <Divider/>
            </Box>
        )}
    </WidgetWrap>
)

}

export default PostWidget
