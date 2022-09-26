import { format, parseISO, isToday } from "date-fns";

const submitLocationBtn = document.getElementById("submit-location");
const Weather = () => {
  const APIKey = "a7bd0b44b3f09e778ab9d3192bcc0217";

  const geoLocation = (async function getGeoLocation() {
    let location = "sheffield";
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
    let weatherData = {
      locationName: unprocessedData.name,
      weather: unprocessedData.weather[0].main,
      temperature: unprocessedData.main.temp,
      feelsLike: unprocessedData.main.feels_like,
      humidity: unprocessedData.main.humidity,
      windSpeed: unprocessedData.wind.speed,
    };
    displayWeather(weatherData);
    changeBackground(weatherData.weather);
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

  function changeBackground(data) {
    let mainElement = document.querySelector("main");
    mainElement.className = "";
    switch (data) {
      case "Clear":
        mainElement.className = "clear";
        break;
      case "Clouds":
        mainElement.className = "clouds";
        break;
      case "Rain":
        mainElement.className = "rain";
        break;
    }
  }

  (async function getForecast() {
    let coord = await geoLocation;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0].lat}&lon=${coord[0].lon}&units=metric&&appid=${APIKey}`
    );
    let unprocessedData = await response.json();
    console.log(unprocessedData);
    let forecastData = [...unprocessedData.list];
    console.log(forecastData);
    displayForecast(forecastData);
  })();

  function displayForecast(data) {
    const forecastSection = document.querySelector("#forecast");
    data.forEach((index) => {
      let forecastInfo = document.createElement("div");
      forecastInfo.className = "forecast-info";
      let forecastDay = document.createElement("p");
      forecastDay.className = "forecast-day";
      // Spliting the string from dt_txt in 2, [0] is date and [1] is time
      if (isToday(parseISO(index.dt_txt.split(" ")[0]))) {
        forecastDay.textContent = "TODAY";
      } else {
        forecastDay.textContent = format(
          parseISO(index.dt_txt.split(" ")[0], 1),
          "dd/MMM"
        );
      }

      let infoBody = document.createElement("div");
      infoBody.className = "forecast-info-body";
      let wrapper = document.createElement("div");
      wrapper.className = "wrapper";
      let forecastTime = document.createElement("p");
      forecastTime.textContent = index.dt_txt.split(" ")[1];
      let forecastWeather = document.createElement("p");
      forecastWeather.textContent = index.weather[0].main;
      let forecastTemp = document.createElement("p");
      forecastTemp.className = "forecast-temp";
      forecastTemp.textContent = Math.round(index.main.temp) + "°C";

      forecastInfo.appendChild(forecastDay);
      wrapper.appendChild(forecastTime);
      wrapper.appendChild(forecastWeather);
      infoBody.appendChild(wrapper);
      infoBody.appendChild(forecastTemp);
      forecastInfo.appendChild(infoBody);
      forecastSection.appendChild(forecastInfo);
    });
  }
};

submitLocationBtn.addEventListener("click", Weather);
