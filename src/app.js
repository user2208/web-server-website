const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('' ,(req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'Metodija'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About',
        name:'Metodija'
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        name:'Metodija',
        message:'This is help message',
        title:'Help'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
      return  res.send({
          error:'Please provide an address!'
      })
    } else geocode(req.query.address, (error,{latitude,longitude,location}= {})=> {
        if(error) {
           return res.send({
                error
            })
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })



   console.log(req.query.address)
//    res.send({
//         geocode:'Prilep',
//        forecast:'Outside its sunny',
//        address:req.query.address
//    })
})

app.get('/products' ,(req,res) => {
    if(!req.query.search){
      return  res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
         products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title:'404',
        name:'Metodija',
        errorMessage:'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'Metodija',
        errorMessage:'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on' + port)
})