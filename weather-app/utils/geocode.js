import request from 'postman-request'

export function geocode(address, callback){
    // encodeURIComponents is meaningful if there are special characters 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmVjaW00NTQyMyIsImEiOiJja3p4cHFkaWEwM3d2MnZxdTA1ZTJqaHVxIn0.ZPI16cMyt2w1eUUo4zzLww&limit=1&fuzzyMatch=false'
    // request data to Mapbox API
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            // undefined takes the place of 'data' in the function call below
            // if error has values, data will be undefined (the opposite is true)
            callback('Unable to connect to location service!', undefined)
        } else if (response.body.features.length === 0){
            callback('Error: invalid query', undefined)
        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[1], 
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}