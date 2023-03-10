function format_time(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return ` ${day}   ${hours}:${minutes}`;
}
function format_day(timestamp) {
  let week_date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[week_date.getDay()];
  return day;
}
function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemp = response.data.main.temp;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name + "," + response.data.sys.country;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity + " %";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed) + " km/hr";
  let feels_likeElement = document.querySelector("#feels_like");
  feels_likeElement.innerHTML =
    Math.round(response.data.main.feels_like) + "°C";
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = format_time(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = `001bc651977f4b024af4d84282b0f02a`;
  //let city = cityInputElement.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showFarhenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farhenheitLink.classList.add("active");
  let farhenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farhenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farhenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-date">
              ${format_day(forecastDays.dt)}
              </div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDays.weather[0].icon
              }@2x.png" alt="" width="42px">
              <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDays.temp.max
              )}°</span> <span class="weather-forecast-temperature-min">${Math.round(
          forecastDays.temp.min
        )}°</span>
              </div>
          </div>
          `;
    }
  });

  forecastHTML =
    forecastHTML +
    ` 
          </div>
          `;

  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesubmit);

let farhenheitLink = document.querySelector("#farhenheit-link");
farhenheitLink.addEventListener("click", showFarhenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("New York");
