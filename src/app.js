//Function for refreshing the weather search
function refreshWeather(response) {
  //refresh the city
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  //refresh the temperature
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  //refresh the description of the weather
  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;

  //refresh the humidity
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  //refresh the wind speed
  let windspeedElement = document.querySelector("#wind-speed");
  let windspeed = response.data.wind.speed;
  windspeedElement.innerHTML = `${windspeed}km/h`;

  //refresh the time
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);
  console.log(date);

  //refresh the weather icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="weather-app-icon" />`;

  console.log(response.data);

  //get forecast for the city
  getForecast(response.data.city);
}

//Function for date format
function formatDate(date) {
  let minute = date.getMinutes();
  let hour = date.getHours();

  //format when minutes are less than 10
  if (minute < 10) {
    minute = `0${minute}`;
  }
  //format when hours are less than 10
  if (hour < 10) {
    hour = `0${hour}`;
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

  let day = days[date.getDay()];

  return `${day} ${hour}:${minute}`;
}

//API function for current weather
function searchCity(city) {
  let apiKey = "390db6dco38711524t5d45ba8dc8afff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

//Main function for search engine
function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

//Submit form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

//First search for Algarve :)
searchCity("Algarve");

//---------------------------------------------------------------

//Function to get the day of forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let shortdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return shortdays[date.getDay()];
}

//---------------------------------------------------------------

//API function for forecast weather
function getForecast(city) {
  let apiKey = "390db6dco38711524t5d45ba8dc8afff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//Forecast function
function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast-day">

        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <div>
          <img src="${
            day.condition.icon_url
          }" alt="" class="weather-forecast-icon"/>
        </div>
                     
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">
                <strong>
                  ${Math.round(day.temperature.maximum)}º
                </strong>
            </span>

            <span class="weather-forecast-temperature-min">
                  ${Math.round(day.temperature.minimum)}º
            </span>
         </div>

      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

//Forecast
displayForecast();

//First search for Algarve :)
getForecast("Algarve");

//---------------------------------------------------------------
