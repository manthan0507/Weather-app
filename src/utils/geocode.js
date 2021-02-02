const request = require('postman-request');

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFudGhhbjA2NCIsImEiOiJja2toeW11Z2wwNTd2Mm5tcTBpNWZlMW1xIn0.vmlW1vi_aUgJQLSKwh8o6Q&limit=1';

    request({ url: geocodeURL, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.message || !body.features.length) {
            callback('Unable to find location, Try other search', undefined);
        } else {
            callback(undefined, { latitude: body.features[0].center[1], longitude: body.features[0].center[0], location: body.features[0].place_name });

        }
    })

}


module.exports = geocode;