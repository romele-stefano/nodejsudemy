import express from 'express'
// no need to install path since is a core module
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import hbs from 'hbs'
import { geocode} from '../utils/geocode.js'
import { forecast } from '../utils/forecast.js'

// store express application
const app = express()
// extract Heroku port
const port = process.env.PORT || 3000

// customize server to use html from public folder
// find path of current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// set template views path for name customization
const viewsPath = path.join(__dirname, '../templates/views')

// set partials template path
const partialsPath = path.join(__dirname, '../templates/partials')

// set template engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

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
        helpText: 'Some text for helping user',
        title: 'Help',
        name: 'Gandalf'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error){
              // stop execution of below code if error is present
              return console.log(error)
            }  
            forecast(latitude, longitude, (error, forecastData) => {
              if (error){
                return console.log(error)
              }
              res.send({
                  location: location,
                  forecast: forecastData
              })
            })
          })
    }
})

app.get('/products', (req, res) => {
    // search is the term in our query string
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

// * means match anything that is not define above
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: 'Article not found',
        name: 'Gandalf'
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        error: '404 - page not found',
        title: 'Page not found',
        name: 'Gandalf'
    })
})


// start the server
// callback is optional
app.listen(port, () => {
    console.log('Server started on port ', port)
})