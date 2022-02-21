import request from 'postman-request'

const url = 'http://api.weatherstack.com/current?access_key=a8718a11df1634acb18e21d1dfdc0648&query=New York'

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.current)
})