var searchHistoryEl = document.querySelector('#search-history');
var sample = ["a","e","i","o","u"];
var fetchButton = document.getElementById('fetch-button');
var APIKey = '06c97fb0689d512139bb0576c61f8276';

// Create a button and add text & a link of previously searched cities
for (var i=0; i<sample.length; i++) {
    var historyItem = document.createElement('button');
    historyItem.textContent = sample[i];
    searchHistoryEl.appendChild(historyItem);
}

// Load weather data for input city when the 'search' button is pressed
function getApi() {
var city = "Denver";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
    .then(function (response) {
     console.log(response.json());
    });
    
    
};

fetchButton.addEventListener('click', getApi);