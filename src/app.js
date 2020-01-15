const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoripath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoripath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kashif'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kashif'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kashif',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must enter address to get the location'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, title } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: title,
                location: forecastData,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        error: 'Help article not found',
        name: 'Kashif',
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        error: 'Page not found',
        name: 'Kashif',
        title: '404',
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})