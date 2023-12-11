# Weather Forecaster

## Description

I created the weather forecaster to test my knowledge of API calls. This was my first experience working with this topic, and I now see it's enormous potential. I appreciated learning how to create these calls from the ground up. I started by doing familiar steps - creating and index.html file, linking a stylesheet and JavaScript page, creating a header, etc. But I was now working with a new framework, Bootstrap, which made the styling and the HTML organization more user-friendly. Thinking back to the grid organization system that I've used previously, I think I'll be using Bootstrap in almost all projects going forward. 

After creating my HTML, I turned to the JS page and created my API calls to the OpenWeather website. There was a learning curve to this process - utilizing JSON to 'unwrap' the data from the website was the first lesson. I then had to work through the data and find the write method to pull out the relevant information from these large datasets. Finally, I had to render this data on my HTML page using query selectors and child apprending methods. The end result of this project was not only a useful weather forecasting application, but a new knowledgebase of API calls. 

## Installation

The respository can be cloned from my Github page here:
https://github.com/ericlyn4s/weather-forecaster

It's also being hosted locally on Github pages here:
https://ericlyn4s.github.io/weather-forecaster/

## Usage

The user can enter a city name in the search box to the left. If nothing is entered on submission, Denver will be the default city. The application will display the current weather data on the top righthand section. It will display the queried city at the top along with the state or country. It will show an icon of the related weather type, which is pulled from the OpenWeather website. Below that icon will be the current temperature, wind speed and humiditiy. In the bottom righthad section, the site will display the city's weather forecast for the next five days. This will show each day's date, a relevant weather icon, the temperature, the wind speed and the humidity percentage. 

<image src="assets/images/city-search.png" alt="Weather Forecaster app shows the current weather for Denver, as well as the five day forecast. Each weather forecast shows a relevant weather icon, alongside temperature, wind speed, and humidity." width="450"/>

The queried city will be added to local storage. Next, each city in the local storage search history array will be added to a button on the left. Should the user click one of these buttons, that city will be queried as described above. 

<image src="assets/images/search-history.png" alt="Previously searched cities are displayed on the lefthand side, with each being a button." width="450"/>

## Credits

I had a tutoring session with Charles Puentes on 12/8/23. 

## License

MIT License

Copyright (c) 2023 Eric Peterson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

