import request from 'postman-request'

export function forecast(latitude, longitude, callback){
    const url = 'http://api.weatherstack.com/forecast?access_key=a8718a11df1634acb18e21d1dfdc0648&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)  
    // we can write url: url, but this is shorthand version
    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Cannot connect to weather service!', undefined)
        } else if (body.error) {
            callback('Error: ' + body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.'); 
        }
    })
}

