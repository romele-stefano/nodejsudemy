import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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

// set findByCredentials
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email: email })

    if (!user){
        throw new Error('Unable to login')
    }

    // verify password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('Unable to login')
    }

    return user
}


// use middleware
// standard function because of this binding
// hash user pwd
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// define user model
export const User = mongoose.model('User', userSchema)
