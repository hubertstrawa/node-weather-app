const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/fbcb465aa2680af215a2ada152fd99b6/${latitude},${longitude}?units=si`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('DARKSKY Unable to connect to service', undefined)
        } else if (body.error) {
            callback('DARKSKY Unable to find location', undefined)
        } else { 
            const {temperature, precipProbability, humidity} = body.currently
            const {summary} = body.daily.data[0]
            callback(undefined, `${summary}. Its currently ${temperature} degrees out. There is ${precipProbability} % chance of rain. Humidity is ${humidity} %`)
        }
    })
}

module.exports = forecast


// WORSE SOLUTION
// const request = require('request')

// const forecast = (coordinates, callback) => {
    // const url = `https://api.darksky.net/forecast/fbcb465aa2680af215a2ada152fd99b6/${coordinates}?units=si`

//     request({url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('DARKSKY Unable to connect to weather service', undefined)
//         } else if (response.body.error) {
//             callback('DARKSKY Unable to find location', undefined)
//         } else {
//             callback(undefined, {
//                 temperature: response.body.currently.temperature,
//                 humidity: response.body.currently.humidity,
//                 precipProbability: response.body.currently.precipProbability,
//                 windSpeed: response.body.currently.windSpeed,
//             })
//         }
//     })
// }

// module.exports = forecast