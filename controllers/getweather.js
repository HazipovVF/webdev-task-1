'use strict';

const WetherModel = require('../models/weather');
const link = 'https://www.metaweather.com/api/location/';


exports.getWeather = (query) => {
    var city = query.query;
    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    var xhr = new XMLHttpRequest();

    if (city) {
        xhr.open('GET', link + 'search/?query=' + city, false);
        xhr.send();
        if (JSON.parse(xhr.responseText)[0] !== undefined) {
            var cityId = JSON.parse(xhr.responseText)[0].woeid;
            xhr.open('GET', link + cityId + '/', false);
            xhr.send();

            return new WetherModel(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET', link + '44418/', false);
    xhr.send();

    return new WetherModel(JSON.parse(xhr.responseText));
};
