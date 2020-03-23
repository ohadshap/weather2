const renderer = new Renderer()
const WM = new WeatherManager()

const loadPage = async function () {
    await WM.getDataFromDB()
    renderer.renderData(WM.cityData)
}
loadPage()

const handleSearch = async function(city) {
    await WM.getCityData(city)
    renderer.renderData(WM.cityData)
}

$("#btn").on("click", async function() {
    let city = $("#input").val()
    city = city.toLowerCase()
    city = city.charAt(0).toUpperCase() + city.slice(1)
    $("#input").val("")
    console.log(city);
    handleSearch(city)
})

$("#content").on("click", ".saveCity", async function() {
    let cityName = $(this).closest(".city").find(".cityName").text()
    let city = await WM.cityData.filter(c => c.name == cityName)[0]
    await WM.saveCity(city)
    renderer.renderData(WM.cityData)
})

$("#content").on("click", ".deleteCity", async function() {
    let cityName = $(this).closest(".city").find(".cityName").text()
    let city = WM.cityData.filter(c => c.name == cityName)[0]
    console.log(city.name)
    await WM.removeCity(city.name)
    let index = WM.cityData.findIndex(c => c.name == city.name)
    WM.cityData.splice(index, 1)
    console.log(WM.cityData);
    renderer.renderData(WM.cityData)
})








