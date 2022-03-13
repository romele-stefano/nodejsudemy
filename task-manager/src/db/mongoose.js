import mongoose from 'mongoose'
import validator from 'validator'

const uri = 'mongodb+srv://nox:nox@cluster0.qcfhr.mongodb.net/task-manager?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser: true
})

// define user model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
})

// create new user
const user = new User({
    name: 'Stefano',
    email: 'test@gmail.com',
    password: 'testmysecret'
})

// save user to DB
user.save().then((result) => {
    console.log(user)
}).catch((error) => {
    console.log('Error: ', error)
})

// define task model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// create new task
const task = new Task({
    description: 'Task 1       '
})

// save task to DB
task.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log('Error: ', error)
})