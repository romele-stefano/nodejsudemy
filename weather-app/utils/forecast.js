import request from 'postman-request'

export function forecast(latitude, longitude, callback){
    const url = 'http://api.weatherstack.com/forecast?access_key=a8718a11df1634acb18e21d1dfdc0648&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)  

    request({ url: url, json: true }, (error, response) => {
        if (error){
            callback('Cannot connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Error: ' + response.body.error.info, undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.'); 
        }
    })
}

