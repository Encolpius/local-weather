$(document).ready(function() {
  getWeather();

  var cityName = document.getElementById('city-name');
  var showDescription = document.getElementById('showDescription');
  var showTemp = document.getElementById('showTemp');
  var rawJson, json, weather;

  /* AJAX Request */

function getWeather() {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?id=4671240&APPID=34c34ef4d9c5f1d7fa0563e0c90233f5&units=imperial", function(result) {
      var rawJson = JSON.stringify(result);
      var json = JSON.parse(rawJson);
      var weather = json.weather[0].main;
      showDescription.textContent = weather;
      showTemp.textContent = json.main.temp;
    })
  }


});
