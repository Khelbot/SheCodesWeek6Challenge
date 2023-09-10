document.addEventListener("DOMContentLoaded", function () {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let message = `${day}, ${hours}:${minutes}`;
  let time = document.querySelector("#time");
  time.innerHTML = message;
});
//Works!
let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
// Works!
//  Show Current Info
function showCurrentLocationInfo(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(currentApiUrl).then(showSearchedLocationInfo);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationInfo);
});
//Works!

// Display search input
function displaySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-search-results");
  let cityName = searchInput.value.trim(); // Get the city name and remove leading/trailing spaces
  if (cityName !== "") {
    getWeatherForCity(cityName);
  }
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}
let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", displaySearch);
//Works!

function getWeatherForCity(cityName) {
  let units = "metric";
  let searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(searchApiUrl).then(showSearchedLocationInfo);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(getWeatherForCity);
});

//  Show Search Info
function showSearchedLocationInfo(response) {
  let city = response.data.name;
  let weatherDescription = response.data.weather[0].description;
  let humidityLevel = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;

  let celsiusTemperature = response.data.main.temp;
  let h2 = document.querySelector("h2");
  h2.innerHTML = Math.round(celsiusTemperature);

  var span = document.querySelector(".weather-description");
  span.innerHTML = weatherDescription;
  var span = document.querySelector(".humidity-level");
  span.innerHTML = `Humidity ${humidityLevel}%`;
  var span = document.querySelector(".wind-speed");
  span.innerHTML = `Winds ${windSpeed}mp/h`;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".searched-temperature");
  celsiusLink.classList.remove("link");
  fahrenheitLink.classList.add("link");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".searched-temperature");
  celsiusLink.classList.add("link");
  fahrenheitLink.classList.remove("link");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector(".search-form");
form.addEventListener("submit", displaySearch);

let fahrenheitLink = document.querySelector("#tempSymbolF");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#tempSymbolC");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

getWeatherForCity("Alaska");
