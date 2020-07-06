const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=07f5efee8abd57cffcdbc6173ae542aa'
    // let destructure the url since the property and the value have the same name
    // Let destructure response too is an object
    request({url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect', undefined)
        } else if(response.body.message)
        {
            callback(undefined, 'City not found')
        } else{
            callback(undefined, `longitude is ${response.body.coord.lon} and the latitude ${response.body.coord.lat}` )
        }

    })
}

module.exports = forecast