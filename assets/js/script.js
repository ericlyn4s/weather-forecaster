// Declare global variables that're established in the HTML
var searchHistoryEl = document.querySelector('#search-history');
var fetchButton = document.getElementById('fetch-button');
var cityInput = document.getElementById('city-input');
var APIKey = '06c97fb0689d512139bb0576c61f8276';
var newCity = [];

// Define the below four variables that need global accessibility since they're being used by two functions 
var temp;
var wind;
var humidity;
var state;

// Create buttons with text of all previously searched citites, which is stores in localhistory
function searchHistoryRender() {
    var searchHistory = JSON.parse(localStorage.getItem('history'))||[];
    if (searchHistory.length > 0) {
        while (searchHistoryEl.firstChild) {
            searchHistoryEl.removeChild(searchHistoryEl.firstChild);
        } for (var i=0; i<searchHistory.length; i++) {    
            var historyItem = document.createElement('button');
            historyItem.textContent = searchHistory[i];
            searchHistoryEl.appendChild(historyItem);
        }
    }
};

// Add event listener for previously searched city buttons
searchHistoryEl.addEventListener('click', cityCheck);
// Check if click in the city history section was on an actual button. If so, requery the site with that city name
function cityCheck(event) {
    var element = event.target;
    if (element.matches('button') === true) {
        console.log(element.textContent);
        cityInput.value = element.textContent;
        getApi();
    }
};

// Load weather data for input city when the 'search' button is pressed
function getApi(city) {

    // Get input value, or default to "Denver". Then store this city in localhistory
    var city = cityInput.value || "Denver";
    newCity.push(city.charAt(0).toUpperCase() + city.slice(1));
    localStorage.setItem('history', JSON.stringify(newCity));
    
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
        // Populate divs with new city weather variables, using day.js to create the proper date formatting here and below
        cityNameEl.textContent = city.charAt(0).toUpperCase() + city.slice(1) + ", " + state + " (" + dayjs().format('MM/DD/YYYY') + ")";
        cityTempEl.textContent += temp + "°F";
        cityWindEl.textContent += wind + " mph";
        cityHumidityEl.textContent += humidity + "%";
    }

    // Get lat and long coordinates of city
    var latLonQuery = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
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
            var fiveForecastQuery = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
            fetch(fiveForecastQuery)
            .then(function (response) {
                return response.json()
            }).then ( function(data) {    
                // 1st forecasted day
                var fcDateEl = document.querySelector("#one-date");
                var fcCityIconEl = document.querySelector("#one-icon");
                var fcCityTempEl= document.querySelector("#one-temp");
                var fcCityWindEl = document.querySelector("#one-wind");
                var fcCityHumidityEl = document.querySelector("#one-humidity");
                // Ensure text content of these divs contains newly queried data
                fcDateEl.textContent = dayjs().add(1, 'day').format('MM/DD/YYYY');
                fcCityIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png");
                fcCityTempEl.textContent = "Temp: " + Math.round(data.list[0].main.temp) + "°F";
                fcCityWindEl.textContent = "Wind: " + Math.round(data.list[0].wind.speed) + " mph";
                fcCityHumidityEl.textContent = "Humidity: " + Math.round(data.list[0].main.humidity) + "%";               
              
                // 2nd forecasted day, override the existing variables with new data
                fcDateEl = document.querySelector("#two-date");
                fcCityIconEl = document.querySelector("#two-icon");
                fcCityTempEl= document.querySelector("#two-temp");
                fcCityWindEl = document.querySelector("#two-wind");
                fcCityHumidityEl = document.querySelector("#two-humidity");
                // Ensure text content of these divs contains newly queried data
                fcDateEl.textContent = dayjs().add(2, 'day').format('MM/DD/YYYY');
                fcCityIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png");
                fcCityTempEl.textContent = "Temp: " + Math.round(data.list[1].main.temp) + "°F";
                fcCityWindEl.textContent = "Wind: " + Math.round(data.list[1].wind.speed) + " mph";
                fcCityHumidityEl.textContent = "Humidity: " + Math.round(data.list[1].main.humidity) + "%"; 

                // 3rd forecasted day, override the existing variables with new data
                fcDateEl = document.querySelector("#three-date");
                fcCityIconEl = document.querySelector("#three-icon");
                fcCityTempEl= document.querySelector("#three-temp");
                fcCityWindEl = document.querySelector("#three-wind");
                fcCityHumidityEl = document.querySelector("#three-humidity");
                // Ensure text content of these divs contains newly queried data
                fcDateEl.textContent = dayjs().add(3, 'day').format('MM/DD/YYYY');
                fcCityIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[2].weather[0].icon + "@2x.png");
                fcCityTempEl.textContent = "Temp: " + Math.round(data.list[2].main.temp) + "°F";
                fcCityWindEl.textContent = "Wind: " + Math.round(data.list[2].wind.speed) + " mph";
                fcCityHumidityEl.textContent = "Humidity: " + Math.round(data.list[2].main.humidity) + "%"; 

                 // 4th forecasted day, override the existing variables with new data
                 fcDateEl = document.querySelector("#four-date");
                 fcCityIconEl = document.querySelector("#four-icon");
                 fcCityTempEl= document.querySelector("#four-temp");
                 fcCityWindEl = document.querySelector("#four-wind");
                 fcCityHumidityEl = document.querySelector("#four-humidity");
                 // Ensure text content of these divs contains newly queried data
                 fcDateEl.textContent = dayjs().add(4, 'day').format('MM/DD/YYYY');
                 fcCityIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + "@2x.png");
                 fcCityTempEl.textContent = "Temp: " + Math.round(data.list[3].main.temp) + "°F";
                 fcCityWindEl.textContent = "Wind: " + Math.round(data.list[3].wind.speed) + " mph";
                 fcCityHumidityEl.textContent = "Humidity: " + Math.round(data.list[3].main.humidity) + "%"; 

                 // 5th forecasted day, override the existing variables with new data
                 fcDateEl = document.querySelector("#five-date");
                 fcCityIconEl = document.querySelector("#five-icon");
                 fcCityTempEl= document.querySelector("#five-temp");
                 fcCityWindEl = document.querySelector("#five-wind");
                 fcCityHumidityEl = document.querySelector("#five-humidity");
                 // Ensure text content of these divs contains newly queried data
                 fcDateEl.textContent = dayjs().add(5, 'day').format('MM/DD/YYYY');
                 fcCityIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png");
                 fcCityTempEl.textContent = "Temp: " + Math.round(data.list[4].main.temp) + "°F";
                 fcCityWindEl.textContent = "Wind: " + Math.round(data.list[4].wind.speed) + " mph";
                 fcCityHumidityEl.textContent = "Humidity: " + Math.round(data.list[4].main.humidity) + "%"; 
        });
    })
    // Add this just-queried city to the search history section
    searchHistoryRender();
};

// Create an event listener for the 'search' button, which kicks off the code above
fetchButton.addEventListener('click', getApi);

