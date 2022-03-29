import express from 'express'
import { User } from '../models/user.js'
import { auth } from '../middleware/auth.js'
export const userRouter = new express.Router()


userRouter.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch(err) {
        res.status(400).send(err)
    }
})

userRouter.post('/users/login', async(req, res) => {
    try {
        // findByCredentials defined in user model
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(err){
        res.status(400).send()
    }
})

userRouter.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            // false if current token is equal to token used in request and remove it
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(err){
        res.status(500).send()
    }
})

userRouter.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(err){
        res.status(500).send()
    }
})

// auth middleware
userRouter.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

userRouter.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(err){
        res.status(500).send()
    }
})

userRouter.patch('/users/:id', async(req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        // every return false if at least one element is false
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send('Error: invalid operation')
    }

    try {
        const user = await User.findById(req.params.id)   

        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(err){
        res.status(400).send(err)
    }
})

userRouter.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)  
        if (!user) {
            return res.status(404).send()
        }  

        res.send(user)
    } catch(err) {
        res.status(500).send(err)
    }
})


