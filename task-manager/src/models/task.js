import mongoose from 'mongoose'
import validator from 'validator'

// define task model
export const Task = mongoose.model('Task', {
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
