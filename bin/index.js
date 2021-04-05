#!/usr/bin/env node

console.log( "Hello!  Please provide a city name and full state name for weather forecast and attire recommendations." );

const prompt = require('prompt');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const yaml = require('js-yaml');
var fs = require('file-system');

prompt.start();

// Prompt user for city and state.  I used Postman to test the endpoint, and found that it was not case sensitive.  
// For future tasks I would start with TDD, and for user input, I would add a case check and/or capitalize the first letter of the city and state and possibly add logic to allow for state abbreviations, rather than just full state names.

prompt.get(['city', 'state'], function (err, result) {
    if (err) { 
        return onErr(err); 
    }
    
    var city = result.city.trim();
    var state = result.state.trim();
    console.log(' Weather for: ' + city + ', ' + state);
    
    var apiKey = '05616663b88e9870bd3f8e6ae9d3849a';
    var endpoint = ('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + state + '&units=imperial&&appid=' + apiKey);
    
    // GET call to OpenWeather API
    var request = new XMLHttpRequest();
    request.open('GET', endpoint, false);
    request.responseTApptype = 'json';
    request.send();

    if(request.readyState == 4) {
        var response = JSON.parse(request.responseText);
        
        // Build response body - opted to hardcode '0' to just return the first result, but this could be looped if I wanted to iterate through all results.  Could also add ternary operators for blank fields, and add "degrees, farenheit/etc." to the end of responses.
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
        
        // Read .config file
        const recommendations = yaml.load(fs.readFileSync('recommendations.config'));

        // Arrays for valid recommendations, and an additional array to see that all recommendations were considered.
        var validRecommendations = [];
        var dontWearList = [];

        // For each recommendation, 
        for(var i=0; i<=recommendations.available_recommendations.length-1; i++) {   
            // if the forecasted weather falls between the minimum and maximum temp,
            if((weather.temp >= recommendations.available_recommendations[i].min_temp) && (weather.temp <= recommendations.available_recommendations[i].max_temp)) {
                // And the forecast is rain or snow,
                if(weather.weather == 'Rain' || weather.weather == 'Snow') {
                    //Check if recommendation is waterproof.
                    if (recommendations.available_recommendations[i].waterproof == 'false') {
                        //Add the recommended item name to the dontWearList
                        dontWearList.push(recommendations.available_recommendations[i].name);
                    } else if(recommendations.available_recommendations[i].waterproof == 'true') {
                        //Add the recommended item name to the validRecommendations array.
                        validRecommendations.push(recommendations.available_recommendations[i].name);
                    } 
                    // If the forecast is not rain or snow, no need for waterproof check.
                } else {
                    validRecommendations.push(recommendations.available_recommendations[i].name);
                }
                //**More scenarios and conditions can be added.
            } 
            else {
                // Otherwise, add the item name to the dontWearList
                dontWearList.push(recommendations.available_recommendations[i].name);
            }
        }

        // If the validRecommendations array is empty, return a message.
        if(validRecommendations.length == 0) {
            validRecommendations.push('You need new attire.');
        }

        // If the dontWearList array is empty, return a message.
        if(dontWearList.length == 0) {
            dontWearList.push('Wear everything.');
        }

        //Output for recommended attire
        console.log("Recommended attire: " + validRecommendations + "\nNot recommended attire: " + dontWearList);
    }
});

function onErr(err) {
    console.log(err);
    return 1;
}
