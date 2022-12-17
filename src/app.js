function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity + " %";
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed + " km/hr";
  feels_likeElement = document.querySelector("#feels_like");
  feels_likeElement.innerHTML = response.data.main.feels_like;
}

let apiKey = `001bc651977f4b024af4d84282b0f02a`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
