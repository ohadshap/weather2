const express = require('express')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const mongoose = require('mongoose')


const app = express()

mongoose.connect("mongodb://localhost/weather-app",  {useNewUrlParser: true,  useUnifiedTopology: true } )

app.use(express.static(path.join(__dirname,  'dist')))
app.use(express.static(path.join(__dirname,  'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', api)


const port = 2700
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})

//     http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}

//     http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1527811200&
// opacity=0.9&fill_bound=true&appid={api_key}

// my API key    6de3d5463a66ec161e6df5634fa79c4a

// API by city    api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}