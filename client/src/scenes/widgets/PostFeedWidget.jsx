import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "state"
import PostWidget from './PostWidget'

const PostFeedWidget =({ userId, isProfile = false }) => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const posts = useSelector((state) => state.posts)

    const getPosts = async () => {
        const res = await fetch('http://localhost:3002/posts', {
            method: 'GET',
            headers: { Authorization: `The chosen ${token}` }
        })
        const data = await res.json()
        dispatch(setPosts({ posts: data }))
    }

    const getUserPosts = async () => {
        const res = await fetch(`http://localhost:3002/posts/${userId}/posts`, {
            method: 'GET',
            headers: { Authorization: `The chosen ${token}` }
        })
        const data = await res.json()
        dispatch(setPosts({ posts: data }))
        console.log(data)
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts()
        } else {
            getPosts()
        }
    }, [])

    return (
        <div>
            {posts.map(({_id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments}) => (
                <PostWidget 
                    postId={_id}
                    key={_id}
                    postUserId={userId}
                    firstName={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                />
            ))}
        </div>
    )
    }

    export default PostFeedWidget