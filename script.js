$(document).ready(function() {

  /* Loading up the Sky Cons */

  let skyconSection = document.getElementById('skycon-section');
  var skycons = new Skycons({"color": "white"});
  skycons.play();

  /* Global variables */

  let latitude, longitude, json;
  let cityName = document.getElementById('city-name');
  let showDescription = document.getElementById('showDescription');
  let showTemp = document.getElementById('showTemp');
  let converter = document.getElementById('converter');
  var current = "Fahrenheit";

  /* Getting the Weather */

  function getWeather() {
    var currentPosition;
    function getCurrentLocation (position) {
      currentPosition = position;
      latitude = currentPosition.coords.latitude;
      longitude = currentPosition.coords.longitude;


      $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=34c34ef4d9c5f1d7fa0563e0c90233f5&units=imperial", function(result) {
        var rawJson = JSON.stringify(result);
        var json = JSON.parse(rawJson);
        updateWeather(json);
        switcher(json);
        })
      }
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }


  /* AJAX Request */


  function updateWeather(json) {
    longitude = json.coord.lon;
    latitude = json.coord.lat;

    var weather = json.weather[0].main;
    console.log(json.weather[0].description);

    var temp = Math.floor(json.main.temp);
    showTemp.textContent = temp + ' °F';

    cityName.textContent = json.name;

    update_Skycons(json);

    /* Updating the Animation */


    function update_Skycons(json) {
      var weather = json.weather[0].description;
      if (weather.indexOf("rain") >= 0) {
        skycons.set(skyconSection, Skycons.RAIN);
      } else if (weather.indexOf("sunny") >= 0) {
        skycons.set(skyconSection, Skycons.CLEAR_DAY)
      } else if (weather.indexOf("clouds") >= 0) {
        skycons.set(skyconSection, Skycons.CLOUDY)
      } else if (weather.indexOf("mist") >= 0) {
        skycons.set(skyconSection, Skycons.CLOUDY)
      } else if (weather.indexOf("clear") >= 0) {
        skycons.set(skyconSection, Skycons.CLEAR_DAY)
      } else if (weather.indexOf("thunderstorm") >= 0) {
        skycons.set(skyconSection, Skycons.SLEET)
      } else if (weather.indexOf("snow") >= 0) {
        skycons.set(skyconSection, Skycons.SNOW)
      }
    }
  }

  /* Temperature Conversion - I know this is a bit messy */

  function toCelsius (json) {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=34c34ef4d9c5f1d7fa0563e0c90233f5&units=imperial", function(result) {
      var rawJson = JSON.stringify(result);
      var json = JSON.parse(rawJson);
      var weather = json.main.temp;
      var celsius = Math.floor((weather - 32) * (5 / 9));
      showTemp.textContent = celsius + ' °C';
    })
  }

   function toFahrenheit(json) {
     $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=34c34ef4d9c5f1d7fa0563e0c90233f5&units=imperial", function(result) {
     var rawJson = JSON.stringify(result);
     var json = JSON.parse(rawJson);
     var weather = json.main.temp;
     var fahrenheit = Math.floor(weather + (9/5) + 32);
     showTemp.textContent = fahrenheit + ' °F'
   })
 }

  function switcher(json) {
    $(converter).click(function() {
      if (current === 'Fahrenheit') {
        converter.textContent = "Celsius";
        $('button').css('margin-left', '.8em')
        toCelsius(json);
        current = 'Celsius';
      } else if (current === "Celsius"){
        converter.textContent = 'Fahrenheit';
        $('button').css('margin-right', '.8em')
        toFahrenheit(json);
        current = 'Fahrenheit';
      }
    })
  }




  getWeather();

});
