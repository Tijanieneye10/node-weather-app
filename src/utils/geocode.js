const request = require('request')


const geocode = (address, callback) => {

    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFybWxlc3NndXkiLCJhIjoiY2tjNThzOHB1MGN0dzJ6cXB2ZzZrcXg3NSJ9.RzXgKuXRYVFbmM74F4udqQ'
    request({url: geoUrl, json: true}, (error, {body} = {}) => {

    if(error)
    {
        callback('Unable to connect to Network', undefined)
        
    } else if(body.features.length == 0)
    {
         callback('Cant find location', undefined)
    }
    else
    {
       callback(undefined,{
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place_name: body.features[0].place_name
       })

    }
})
}




module.exports = geocode


