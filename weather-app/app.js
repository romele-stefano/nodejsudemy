import { geocode} from './utils/geocode.js'
import { forecast } from './utils/forecast.js'

// add string with city when running node app.js 
const address = process.argv[2]
if (!address) {
  console.log('Please, provide an address')
} else {
  // = {} provides a default in case of an error (so the callback will be given the 2 arguments)
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error){
      // stop execution of below code if error is present
      return console.log(error)
    } 
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error){
        return console.log(error)
      }
  
      console.log(location)
      console.log(forecastData)
    })
  })
}




