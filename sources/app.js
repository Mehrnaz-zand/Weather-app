let currentTime = new Date();

function formatDayTime(dayTime) {
  let hours = dayTime.getHours();
  if (hours < 10) {
    hours = `0${hour}`;
  }
  let minutes = dayTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let whatTime = document.querySelector("#what-time");
whatTime.innerHTML = formatDayTime(currentTime);

function whatDay(day) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let newDay = days[day.getDay()];

  return `${newDay}`;
}

let whichDay = document.querySelector("#which-day");
whichDay.innerHTML = whatDay(currentTime);

function getDate(dates) {
  let year = dates.getFullYear();
  let date = dates.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[dates.getMonth()];
  return `${date} ${month} ${year}`;
}

let whichDate = document.querySelector("#which-date");
whichDate.innerHTML = getDate(currentTime);

function convertFarenheit(event) {
  event.preventDefault();

  mainDegree.innerHTML = Math.round(temperature * 9) / 5 + 32;
}

let mainDegree = document.querySelector(".degree");
let temperature = mainDegree.innerHTML;
temperature = Number(temperature);

let changeFarenheit = document.querySelector(".farenheit");
changeFarenheit.addEventListener("click", convertFarenheit);

function convertCelsius(event) {
  event.preventDefault();
  let celsiusDegree = document.querySelector(".degree");
  celsiusDegree.innerHTML = temperature;
}

let changeCelsius = document.querySelector(".celsius");
changeCelsius.addEventListener("click", convertCelsius);

function showCurrentTemperature(response) {
  document.querySelector(".degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#new-city").innerHTML = response.data.name;
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "19351561bdce0a99202ae9e49984792f";
  let locationApiUrl = `https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(locationApiUrl).then(showCurrentTemperature);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showLocation);

function updateSearchCity(response) {
  document.querySelector("#new-city").innerHTML = response.data.list[0].name;
  document.querySelector(".degree").innerHTML = Math.round(
    response.data.list[0].main.temp
  );
  document.querySelector(
    ".humidity"
  ).innerHTML = ` Humidity: ${response.data.list[0].main.humidity}%`;
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.list[0].wind.speed
  )} km/h`;
  document.querySelector(".description").innerHTML =
    response.data.list[0].weather[0].main;
}

function search(city) {
  let apiKey = "19351561bdce0a99202ae9e49984792f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateSearchCity);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-value").value;
  search(city);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", searchCity);

search("paris");