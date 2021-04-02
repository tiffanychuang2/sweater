#!/usr/bin/env node

console.log( "Hello!" );

const prompt = require('prompt');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var http = require('http');

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
    request.responseType = 'json';
    request.send();
    request.onreadystatechange = function() {
        if(request.readyState ==4) {
            if(request.status == 200) {
                var response = JSON.parse(request.responseText);
                var weather = {
                    
                }
            }
        } else {
            return 'error';
        }
    }
    console.log(JSON.stringify(request));
    // console.log(JSON.stringify(response));

    // var weather = {
    //     "temp": response.list.main.temp
    // };

    // console.log(weather);
    
});

//Print out message
// function printMessage(city, description, temperature, wind, clouds){
//     var message = 'Currently, ' + city + ' has ' + description + 
//             ', a temperature of ' + temperature + ' degrees Celsius' +
//             ', a wind speed of ' + wind + 
//             ' m/s and clouds covering ' + clouds + '% of the sky.';
//     console.log(message);
// }

// //Print out error
// function printError(error){
//     console.error(error.message);
// }

// function getWeather(city, state){
//     // var key = '05616663b88e9870bd3f8e6ae9d3849a';
//     // var linkByCityName = 'http://api.openweathermap.org/data/2.5/weather?q=';

//     //Connect to the API
//     var apiKey = '05616663b88e9870bd3f8e6ae9d3849a';
//     var endpoint = ('api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + state + '&appid=' + apiKey);
//     var request = http.get(endpoint, function(response){
//         var body = '';
//         //Read data
//         response.on('data', function(chunk){
//             body += chunk;
//         });
//         response.on('end', function(){
//                     //Parse data
//                     var weather = JSON.parse(body);
//                     printMessage(weather.name, 
//                                 weather.weather[0].description, 
//                                 weather.main.temp.toFixed(1), 
//                                 weather.wind.speed, 
//                                 weather.clouds.all);
//         });
//     });
//     request.on('error', printError);
// }

// var city = process.argv.slice(2);
// getWeather(city);

// let request = new XMLHttpRequest();
// let response = request.response;
// request.open('GET', endpoint, true);
// request.responseType = 'json';
// request.send();
// console.log(response);

function onErr(err) {
    console.log(err);
    return 1;
}
