import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        max: 50,
        unique: true
    },
    email: {
        type: String,
        required: true, 
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    picturePath: {
        type: String,
        default: '',
        unique: false,
    },
    friends: {
        type: Array,
        default: [],
        unique: false,
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export default User