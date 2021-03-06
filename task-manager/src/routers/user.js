import express from 'express'
import { User } from '../models/user.js'
import { auth } from '../middleware/auth.js'
import multer from 'multer'
import sharp from 'sharp'

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

userRouter.patch('/users/me', auth, async(req, res) => {
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
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch(err){
        res.status(400).send(err)
    }
})

userRouter.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch(err) {
        res.status(500).send(err)
    }
})

// upload files
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

userRouter.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // manipulate image
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
   res.status(400).send({ error: error.message }) 
   console.log(error.message)
})

userRouter.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

userRouter.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar){
            throw new Error()
        }

        // set response header
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch(err){
        res.status(404).send()
    }
})


