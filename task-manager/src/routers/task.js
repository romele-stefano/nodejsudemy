import express from 'express'
import { Task } from '../models/task.js'
import { auth } from '../middleware/auth.js'
export const taskRouter = new express.Router()

taskRouter.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        // ... is the ES6 spread operator
        // copy all the properties from req.body to task object
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(err){
        res.status(400).send(err)
    }
})

taskRouter.get('/tasks', auth, async(req, res) => {
    const match = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match: match
        })
        res.send(req.user.tasks)
    } catch(err){
        res.status(500).send()
    }
})

taskRouter.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id
    
    try {
        // return only task for the owner
        const task = await Task.findOne({ _id: _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(err) {
        res.status(500).send()
    }
})

taskRouter.patch('/tasks/:id', auth, async(req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send('Error: invalid operation')
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
 
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(err) {
        res.status(400).send(err)
    }
})

taskRouter.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id  })
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(err) {
        res.status(500).send(err)
    }
})

