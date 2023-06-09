import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
}

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error('no found user friends')
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPostFeed = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post
                return post
            })
            state.posts = updatedPostFeed
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = userAuthSlice.actions
export default userAuthSlice.reducer