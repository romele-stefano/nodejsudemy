import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// standard function because of "this"
// use methods because we need to use function on our instance
userSchema.methods.generateAuthToken = async function(){
    const user = this
    // generate JWT
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    // save token to user document in MongoDB
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    
    return token
}


// set findByCredentials
// use statics because we need to use function on the model
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
