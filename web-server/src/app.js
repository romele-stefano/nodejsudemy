import express from 'express'
// no need to install path since is a core module
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

// store express application
const app = express()

// customize server to use html from public folder
// find path of current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// configure server behavior
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'New York City'
    })
})


// start the server
// callback is optional
app.listen(3000, () => {
    console.log('Server started on port 3000')
})