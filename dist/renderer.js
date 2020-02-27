class Renderer {

    renderData(cityData) {
        $('#content').empty()
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({cities: cityData});
        $('#content').append(newHTML);
    }
}

