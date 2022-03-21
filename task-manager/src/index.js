import express from 'express'
import { dbConnection } from './db/mongoose.js'
import { userRouter } from './routers/user.js'
import { taskRouter } from './routers/task.js'

const app = express()
// process.env.PORT for Heroku
const port = process.env.PORT || 3000

// parse json in object so we can use in our requests
app.use(express.json())
app.use(userRouter, taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

