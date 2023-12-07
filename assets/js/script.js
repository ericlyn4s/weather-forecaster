var searchHistoryEl = document.querySelector('#search-history');
var sample = ["a","e","i","o","u"];
var fetchButton = document.getElementById('fetch-button');
var APIKey = '06c97fb0689d512139bb0576c61f8276';
var city = "Denver";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Create a button and add text & a link of previously searched cities
for (var i=0; i<sample.length; i++) {
    var historyItem = document.createElement('button');
    historyItem.textContent = sample[i];
    searchHistoryEl.appendChild(historyItem);
}

function getApi() {
  
fetch(queryURL);
console.log('success');

};

fetchButton.addEventListener('click',getApi);