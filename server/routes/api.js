const express = require('express')
const request = require('request')
const router = express.Router()
const City = require('../models/City')


router.get('/city/:cityName', function (req, res) {
    let cityName = req.params.cityName
    request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6de3d5463a66ec161e6df5634fa79c4a`, function (err, response) {
        let data = JSON.parse(response.body)
        let city = {
            name: data.name,
            temperature: (Math.round(data.main.temp) - 273),
            condition: data.weather[0].main,
            conditionPic: data.weather[0].icon
        }

        res.send(city)
    })
})

router.get('/cities', async function (req, res) {
    await City.find({}).exec(function (err, response) {
        res.send(response)
    })
})

router.post('/city', async function(req, res) {
    let city = new City(req.body)
    await city.save()
    res.end()
})

router.delete('/city/:cityName', async function(req, res) {
    let cityName = req.params.cityName
    await City.findOneAndDelete({
        name: cityName
    })

    res.send(cityName)
    
})




module.exports = router