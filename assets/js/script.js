var searchHistoryEl = document.querySelector('#search-history');
var sample = ["a","e","i","o","u"];
var fetchButton = document.getElementById('fetch-button');

// Create a button and add text & a link of previously searched cities
for (var i=0; i<sample.length; i++) {
    var historyItem = document.createElement('button');
    historyItem.textContent = sample[i];
    searchHistoryEl.appendChild(historyItem);
}

function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

fetch(requestUrl)

    .then(function (response) {
        return response.json();
    })
    .then(console.log('yes'));
};

fetchButton.addEventListener('click',getApi);