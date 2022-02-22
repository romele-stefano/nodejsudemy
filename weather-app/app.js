import { geocode} from './utils/geocode.js'
import { forecast } from './utils/forecast.js'


forecast(44.1545, -75.7088, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })