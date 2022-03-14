import express from 'express'
import { dbConnection } from './db/mongoose.js'
import { User } from './models/user.js'
import { Task } from './models/task.js'

const app = express()
// process.env.PORT for Heroku
const port = process.env.PORT || 3000

// parse json in object so we can use in our requests
app.use(express.json())


// USER ENDPOINT

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(400).send(err)
    })
})


// TASK ENDPOINT

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})