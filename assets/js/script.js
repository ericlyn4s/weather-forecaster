var searchHistoryEl = document.querySelector('#search-history');
var sample = ["a","e","i","o","u"];
var fetchButton = document.getElementById('fetch-button');
var cityInput = document.getElementById('city-input');
var APIKey = '06c97fb0689d512139bb0576c61f8276';
var temp;
var wind;
var humidity;
var state;
var fcTemp;
var fcWind;
var fcHumidity;
var count;

// Create a button and add text & a link of previously searched cities
for (var i=0; i<sample.length; i++) {
    var historyItem = document.createElement('button');
    historyItem.textContent = sample[i];
    searchHistoryEl.appendChild(historyItem);
}

// Load weather data for input city when the 'search' button is pressed
function getApi() {

    // Get input value, or default to "Denver"
    var city = cityInput.value || "Denver";

    // Render current weather information for city
    function currentCityRender() {
        var cityNameEl = document.querySelector("#city-name");
        var cityIconEl = document.querySelector("#current-icon");
        var cityTempEl = document.querySelector("#city-temp");
        var cityWindEl = document.querySelector("#city-wind");
        var cityHumidityEl = document.querySelector("#city-humidity");
        // Ensure text content of these divs is cleared out
        cityIconEl.setAttribute("src", weatherIcon);
        cityTempEl.textContent = "Temp: ";
        cityWindEl.textContent = "Wind: ";
        cityHumidityEl.textContent = "Humidity: ";
        // Populate divs with new city weather variables
        cityNameEl.textContent = city + ", " + state;
        cityTempEl.textContent += temp + "°F";
        cityWindEl.textContent += wind + " mph";
        cityHumidityEl.textContent += humidity + "%";
    }

    function fiveForecastRender() {
        var translator = ["one","two","three","four","five"];
        var numWord = translator[count];
        fcDateEl = document.querySelector("#"+numWord+"-date");
        var fcCityIconEl = document.querySelector("#"+numWord+"-icon");
        var fcCityTempEl= document.querySelector("#"+numWord+"-temp");
        var fcCityWindEl = document.querySelector("#"+numWord+"-wind");
        var fcCityHumidityEl = document.querySelector("#"+numWord+"-humidity");

        console.log(numWord);
        /*
        // Ensure text content of these divs is cleared out
        fcCityTempEl.textContent = "Temp: ";
        fcCityWindEl.textContent = "Wind: ";
        fcCityHumidityEl.textContent = "Humidity: ";
        // Populate divs with new forecasted weather variables
        fcDateEl.textContent = Date().substring(4,15);
        fcCityIconEl.setAttribute("src", weatherIcon);
        fcCityTempEl.textContent += fcTemp + "°F";
        fcCityWindEl.textContent += fcWind + " mph";
        fcCityHumidityEl.textContent += fcHumidity + "%";
        */
    }

    

    // Get lat and long coordinates of city
    var latLonQuery = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
    fetch(latLonQuery) 
        .then(function (response) {
            return response.json()
        }).then ( function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            state = data[0].state;
            // Pass lat and long coordinates into current weather API query
            var currentWeatherQuery = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            fetch(currentWeatherQuery)
            .then(function (response) {
                return response.json()
            }).then ( function(data) {
                weatherIcon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                temp = Math.round(data.main.temp);
                wind = Math.round(data.wind.speed);
                humidity = Math.round(data.main.humidity);
                currentCityRender();
            })
            // Pass lat and long coordinated into five-day forecast query
            var fiveForecastQuery = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            for (i=0; i<6; i++) {
                count++;
                fetch(fiveForecastQuery)
                .then(function (response) {
                    return response.json()
                }).then ( function(data) {
                    fcWeatherIcon = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                    fcTemp = Math.round(data.list[i].main.temp);
                    fcWind = Math.round(data.list[i].wind.speed);
                    fcHumidity = Math.round(data.list[i].main.humidity);
                    fiveForecastRender();
            })
            }
            });
            
};


fetchButton.addEventListener('click', getApi);