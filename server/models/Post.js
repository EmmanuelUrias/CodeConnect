import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})