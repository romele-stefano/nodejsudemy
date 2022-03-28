import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'


export async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // check if token is valid
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user){
            throw new Error()
        }

        // store user in request
        req.user = user
        next()
    } catch(err){
        res.status(401).send({ 'error': 'Please authenticate' })
    }
}