const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const forecastURL = 'http://api.weatherstack.com/current?access_key=ba4af62665d3923b6cbfee2566d66202&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';

    request({ url: forecastURL, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location, Try other search', undefined);
        } else {
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                icon: body.current.weather_icons[0]
            });
        }
    })

}

module.exports = forecast;