const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWV0b2RpamExMjM0IiwiYSI6ImNrZ3Ixemh0MzBhb20ycnF3OWJkYnl6M28ifQ.uN7_WRdFSxWigKQY9ogmlA&limit=1'
     
     request({url,json:true}, (error,{body}) => {
         if(error){
             callback('Please check your network connection',undefined)
         } else if (body.features.length === 0) {
             callback('Unnable to find the location',undefined)
         } else  {
             callback(undefined,{
                  latitude:body.features[0].center[0],
                  longitude: body.features[0].center[1],
                  location:body.features[0].place_name
             })
         }
 
 
     })
 }

 module.exports = geocode