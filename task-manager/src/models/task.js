import mongoose from 'mongoose'
import validator from 'validator'

const taskSchema = new mongoose.Schema({ 
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // reference to User model
        ref: 'User'
    }
}, {
    timestamps: true
})

// define user model
export const Task = mongoose.model('Task', taskSchema)
