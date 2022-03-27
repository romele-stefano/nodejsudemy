import express from 'express'
import { Task } from '../models/task.js'
export const taskRouter = new express.Router()

taskRouter.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(err){
        res.status(400).send(err)
    }
})

taskRouter.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(err){
        res.status(500).send()
    }
})

taskRouter.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(err) {
        res.status(500).send()
    }
})

taskRouter.patch('/tasks/:id', async(req, res) => {
    const allowedUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send('Error: invalid operation')
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(err) {
        res.status(400).send(err)
    }
})

taskRouter.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(err) {
        res.status(500).send(err)
    }
})

