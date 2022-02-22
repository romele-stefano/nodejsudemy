import request from 'postman-request'

//const url = 'http://api.weatherstack.com/current?access_key=a8718a11df1634acb18e21d1dfdc0648&query=New York'
const url = 'http://api.weatherstack.com/forecast?access_key=a8718a11df1634acb18e21d1dfdc0648&query=New%20York'

// json: true automatically parse the JSON response
/* request({ url: url, json: true }, (error, response) => {
    console.log('The weather in ' + response.body.location.name + ' is ' + response.body.current.weather_descriptions[0])
    console.log('It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike)
})
 */
// find coordinates for city
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmVjaW00NTQyMyIsImEiOiJja3p4cHFkaWEwM3d2MnZxdTA1ZTJqaHVxIn0.ZPI16cMyt2w1eUUo4zzLww&limit=1'

request({ url: geocodeURL, json: true}, (error, response) => {
    const latitude = response.body.features[0].center[1]
    const longitude = response.body.features[0].center[0]
    console.log(latitude + ' ' + longitude)
})