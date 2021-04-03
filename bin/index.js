#!/usr/bin/env node

console.log( "Hello!" );

const prompt = require('prompt');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const yaml = require('js-yaml');
var fs = require('file-system');


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
        
        const recommendations = yaml.load(fs.readFileSync('recommendations.config'));

        var validRecommendations = [];
        var dontWearList = [];

        for(var i=0; i<=recommendations.available_recommendations.length-1; i++) {   
            if((weather.temp >= recommendations.available_recommendations[i].min_temp) && (weather.temp <= recommendations.available_recommendations[i].max_temp)) {
                if(weather.weather == 'Rain' && ecommendations.available_recommendations[i].waterproof == 'true') {
                validRecommendations.push(recommendations.available_recommendations[i].name);
                }
            } else {
                dontWearList.push(recommendations.available_recommendations[i].name);
            }
        }

        if(validRecommendations.length == 0) {
            validRecommendations.push('You need new attire.');
        }

        console.log("Recommended attire: " + validRecommendations + "\nNot recommended attire: " + dontWearList);
    }
});

function onErr(err) {
    console.log(err);
    return 1;
}
