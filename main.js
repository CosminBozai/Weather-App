const APIKey = "a7bd0b44b3f09e778ab9d3192bcc0217";
const submitLocationBtn = document.getElementById("submit-location");
submitLocationBtn.addEventListener("click", getWeather);

async function getGeoLocation(location) {
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIKey}`,
    { mode: "cors" }
  );
  let responseData = await response.json();
  return responseData;
}

async function getWeather() {
  let location = document.getElementById("location-input").value;
  let geoLocation = await getGeoLocation(location);
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation[0].lat}&lon=${geoLocation[0].lon}&units=metric&appid=${APIKey}`
  );
  let unprocessedData = await response.json();
  //   console.log(unprocessedData);
  let weatherData = {
    weather: unprocessedData.weather[0].main,
    temperature: unprocessedData.main.temp,
    feelsLike: unprocessedData.main.feels_like,
    humidity: unprocessedData.main.humidity,
    windSpeed: unprocessedData.wind.speed,
  };
  displayWeather(weatherData);
}

function displayWeather(data) {
  const temperatureSpan = document.querySelector("p span");
  temperatureSpan.textContent = data.temperature;
}
