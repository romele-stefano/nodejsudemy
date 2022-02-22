import request from 'postman-request'

// const url = 'http://api.weatherstack.com/current?access_key=a8718a11df1634acb18e21d1dfdc0648&query='
// const url = 'http://api.weatherstack.com/forecast?access_key=a8718a11df1634acb18e21d1dfdc0648&query=New%20York'

// json: true automatically parse the JSON response
/* request({ url: url, json: true }, (error, response) => {
    if (error){
        console.log('Cannot connect to weather service!')
    } else if (response.body.error) {
        console.log('Error: ' + response.body.error.info)
    } else {
        console.log('The weather in ' + response.body.location.name + ' is ' + response.body.current.weather_descriptions[0])
        console.log('It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike)
    }
}) */

// find coordinates for city
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1IjoidmVjaW00NTQyMyIsImEiOiJja3p4cHFkaWEwM3d2MnZxdTA1ZTJqaHVxIn0.ZPI16cMyt2w1eUUo4zzLww&limit=1&fuzzyMatch=false'

request({ url: geocodeURL, json: true}, (error, response) => {
    if (error) {
        console.log('Cannot connect to map service!')
    } else if (response.body.features.length === 0) {
        console.log('Error: invalid query')
    } else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        console.log(latitude + ' ' + longitude)
    }
})