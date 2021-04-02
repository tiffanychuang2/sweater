#!/usr/bin/env node

console.log( "Hello!" );

const prompt = require('prompt');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


prompt.start();

prompt.get(['city', 'state'], function (err, result) {
    if (err) { return onErr(err); }
    
    console.log('What city are you in?');
    var city = result.city.trim();
    console.log('What state?');
    var state = result.state.trim();
    console.log(' Weather for: ' + city + ', ' + state);
    
    var apiKey = '05616663b88e9870bd3f8e6ae9d3849a';
    var endpoint = ('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + state + '&units=imperial&&appid=' + apiKey);
    var request = new XMLHttpRequest();
    // var response = JSON.parse(request.responseText);
    request.open('GET', endpoint, false);
    request.responseTApptype = 'json';
    request.send();
    if(request.readyState == 4) {
        var response = JSON.parse(request.responseText);
        var weather = {
            "date": response.list[0].dt_txt,
            "city name": response.city.name,
            "temp": response.list[0].main.temp,
            "temp_min": response.list[0].main.temp_min,
            "temp_max": response.list[0].main.temp_max,
            "humidity": response.list[0].main.humidity,
            "weather": response.list[0].weather[0].main,
            "description": response.list[0].weather[0].description,
            "cloudiness": response.list[0].clouds.all,
            "wind": response.list[0].wind.speed
        }
        console.log(weather);

    }
});



function onErr(err) {
    console.log(err);
    return 1;
}
