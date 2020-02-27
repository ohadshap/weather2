class WeatherManager {
    constructor() {
        this.cityData = []
    }
    
    async getDataFromDB() {
        let cities = await $.get('/cities')
        cities.forEach(c => {
            let i = 0
            for(let city of this.cityData) {
                if(city.name == c.name) {i++}
            }
            if(i == 0) {
                this.cityData.push(c)
            }
        })
    }

    async getCityData(cityName) {    
    
        let i = 0
        this.cityData.forEach(c => {
            if(c.name == cityName) {
                console.log(`fail`) 
                i++      
                return
            }
        })
        if(i == 0) {
            let city = await $.get(`city/${cityName}`)
            this.cityData.push(city)
        }
        
    }

    async saveCity(city) {
        let i = WM.cityData.findIndex(c => c.name == city.name)
        await $.post('/city', city)
        console.log(`saved ${city.name}`);
        this.cityData[i]._id =true
    }

    async removeCity(cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE'
        })
        
    }

}
