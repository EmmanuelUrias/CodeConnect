import User from '../models/User.js'
import express from 'express'

// Read
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        console.log(user)
        res.status(200).json(user)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)

        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        )

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })
        res.status(200).json(formattedFriends)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// Update
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)) { // This if statement is removing the friend or user if the friendId/id is equal to the id
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else { // adds friends
            user.friends.push(friendId) 
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })

        res.status(200).json(formattedFriends)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}