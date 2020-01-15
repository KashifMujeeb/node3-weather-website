const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FzaGlmbXVqZWViIiwiYSI6ImNrNTZ4ZzFjZjE5d2EzbWxxb3MzMDU5a2cifQ.GGOpnB1uOQq7KKjld7jcfA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                title: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode