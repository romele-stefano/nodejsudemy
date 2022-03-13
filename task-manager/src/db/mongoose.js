import mongoose from 'mongoose'

const uri = 'mongodb+srv://nox:nox@cluster0.qcfhr.mongodb.net/task-manager?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser: true
})

// define user model
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// create new user
/* const user = new User({
    name: 'Stefano',
    age: 30
})

// save user to DB
user.save().then((result) => {
    console.log(user)
}).catch((error) => {
    console.log('Error: ', error)
}) */

// define task model
const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// create new task
const task = new Task({
    description: 'Task 1',
    completed: false
})

// save task to DB
task.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log('Error: ', error)
})