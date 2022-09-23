const APIKey = "a7bd0b44b3f09e778ab9d3192bcc0217";

async function getGeoLocation(location) {
  let response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${APIKey}`,
    { mode: "cors" }
  );
  let responseData = await response.json();
  return responseData;
}

const Temperature = async function getWeather(location) {
  let geoLocation = await getGeoLocation(location);
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation[0].lat}&lon=${geoLocation[0].lon}&units=metric&appid=${APIKey}`
  );
  let unpocessedData = await response.json();
  let temp = unpocessedData.main.temp;
  return temp;
};

console.log(Temperature("sheffield"));
