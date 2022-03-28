import express from 'express'
import { dbConnection } from './db/mongoose.js'
import { userRouter } from './routers/user.js'
import { taskRouter } from './routers/task.js'

const app = express()
// process.env.PORT for Heroku
const port = process.env.PORT || 3000

// add middleware (be sure is before other app.use)
/* app.use((req, res, next) => {
    if (req.method === 'GET'){
        res.send('GET requests are disabled')
    } else {
        next()
    }
})
 */

// parse json in object so we can use in our requests
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

