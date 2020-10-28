const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=000b14c35a08e9fe7466fe6c9e6abe99&query='+ longitude +','+ latitude +'&units=m'

    request({ url, json:true}, (error,{body}) => {
        if (error) {
            callback ('You dont have access to the service',undefined)
        } else if (body.error) {
            callback('Missmached search' ,undefined)
        } else {
            callback(undefined,'It is curently ' + body.current.temperature + ' degrees out.There is ' + body.current.precip + '% of chance of rain. ')
        }
    } )
}





module.exports = forecast