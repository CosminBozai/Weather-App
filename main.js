const submitLocationBtn = document.getElementById("submit-location");
const Weather = () => {
  const APIKey = "a7bd0b44b3f09e778ab9d3192bcc0217";

  const geoLocation = (async function getGeoLocation() {
    let location = document.getElementById("location-input").value;
    try {
      let response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIKey}`,
        { mode: "cors" }
      );
      let responseData = await response.json();
      return responseData;
    } catch (err) {
      alert(err);
    }
  })();

  (async function getWeather() {
    let coord = await geoLocation;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0].lat}&lon=${coord[0].lon}&units=metric&appid=${APIKey}`
    );
    let unprocessedData = await response.json();
    console.log(unprocessedData);
    let weatherData = {
      locationName: unprocessedData.name,
      weather: unprocessedData.weather[0].main,
      temperature: unprocessedData.main.temp,
      feelsLike: unprocessedData.main.feels_like,
      humidity: unprocessedData.main.humidity,
      windSpeed: unprocessedData.wind.speed,
    };
    displayWeather(weatherData);
  })();

  function displayWeather(data) {
    let headerDisplay = document.querySelector("h1 span");
    headerDisplay.textContent = data.locationName;
    let weatherDisplay = document.getElementById("weather");
    weatherDisplay.textContent = data.weather;
    let temperatureDisplay = document.getElementById("temperature");
    temperatureDisplay.textContent = Math.round(data.temperature) + "°C";
    let feelsLikeDisplay = document.querySelector("#feels-like span");
    feelsLikeDisplay.textContent = Math.round(data.feelsLike) + "°C";
    let humidityDisplay = document.querySelector("#humidity span");
    humidityDisplay.textContent = data.humidity + "%";
    let windSpeedDisplay = document.querySelector("#wind span");
    windSpeedDisplay.textContent = data.windSpeed + "km/h";
  }

  (async function getForecast() {
    let coord = await geoLocation;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0].lat}&lon=${coord[0].lon}&appid=${APIKey}`
    );
    let unprocessedData = await response.json();
  })();
};

submitLocationBtn.addEventListener("click", Weather);
