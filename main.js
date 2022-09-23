const submitLocationBtn = document.getElementById("submit-location");
const Weather = () => {
  const APIKey = "a7bd0b44b3f09e778ab9d3192bcc0217";

  const geoLocation = (async function getGeoLocation() {
    let location = document.getElementById("location-input").value;
    let response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIKey}`,
      { mode: "cors" }
    );
    let responseData = await response.json();
    return responseData;
  })();

  (async function getWeather() {
    let coord = await geoLocation;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0].lat}&lon=${coord[0].lon}&units=metric&appid=${APIKey}`
    );
    let unprocessedData = await response.json();
    let weatherData = {
      weather: unprocessedData.weather[0].main,
      temperature: unprocessedData.main.temp,
      feelsLike: unprocessedData.main.feels_like,
      humidity: unprocessedData.main.humidity,
      windSpeed: unprocessedData.wind.speed,
    };
    displayWeather(weatherData);
  })();

  function displayWeather(data) {
    const temperatureSpan = document.querySelector("p span");
    temperatureSpan.textContent = data.temperature;
  }

  (async function getForecast() {
    let coord = await geoLocation;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0].lat}&lon=${coord[0].lon}&appid=${APIKey}`
    );
    let unprocessedData = await response.json();
    console.log(unprocessedData);
  })();
};

submitLocationBtn.addEventListener("click", Weather);
