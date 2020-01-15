const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/603d08fefd84c269aea474cffac5ff8b/' + lat + ',' + long
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('unable to find location, Try again later', undefined)
        } else {
            callback(undefined, 'Hi temp ' + body.daily.data[0].temperatureHigh + ' Low temp ' + body.daily.data[0].temperatureLow + ' ' + body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast