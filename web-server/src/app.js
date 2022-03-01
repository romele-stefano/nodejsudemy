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

// set template engine
app.set('view engine', 'hbs')

// routes
app.get('', (req, res) => {
    // render template
    res.render('index', {
        // values will be available in index.hbs
        title: 'Dynamic title',
        name: 'Gandalf'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Gandalf'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some text for helping user'
    })
})

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