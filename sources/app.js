

function getUpdateTime(timestamp){
let time= new Date();
let hours = time.getHours();
if (hours < 10) {
  hours= `0${hours}`;
}
let minutes= time.getMinutes();
if (minutes < 10) {
    minutes= `0${minutes}`;
}

 let days = [
    "Sunday", 
    "Monday",
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"];
    let day = days[time.getDay()];

return `${day} ${hours}:${minutes}`;




}




function showTemperature (response){
   celsiusTemperature = response.data.list[0].main.temp;
   document.querySelector(".degree").innerHTML= Math.round(celsiusTemperature);
   document.querySelector("#city").innerHTML=(response.data.list[0].name);
   document.querySelector(".humidity").innerHTML = response.data.list[0].main.humidity;
   document.querySelector(".wind").innerHTML = Math.round(response.data.list[0].wind.speed);
   document.querySelector(".description").innerHTML = response.data.list[0].weather[0].description;
   document.querySelector("#date-time").innerHTML = getUpdateTime(response.data.dt*1000);
   document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`);
   document.querySelector("#icon").setAttribute("alt", response.data.list[0].weather[0].description);
}

function search(city){
  let apiKey= "19351561bdce0a99202ae9e49984792f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#city-value").value;
  search(city);
 }


function showLocationTemperature (response){
   celsiusTemperature = response.data.main.temp;
   document.querySelector(".degree").innerHTML = Math.round(celsiusTemperature);
   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector(".humidity").innerHTML =response.data.main.humidity;
   document.querySelector(".wind").innerHTML = Math.round(response.data.wind.speed);
   document.querySelector(".description").innerHTML = response.data.weather[0].description;
   document.querySelector("#date-time").innerHTML = getUpdateTime(response.data.dt*1000);
   document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);


 }


function updateLocation(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey= "19351561bdce0a99202ae9e49984792f";
  let locationApiUrl= `https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(locationApiUrl).then(showLocationTemperature);
 }


function findLocation(event){
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(updateLocation);
 }


function convertFahrenheit(event){
  event.preventDefault();
  let temperature= document.querySelector(".degree");
  let fahrenheitTemperature =(celsiusTemperature *9) /5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

 
 function convertCelsius(event){
  event.preventDefault();
  let temperature= document.querySelector(".degree");
  temperature.innerHTML = Math.round(celsiusTemperature); 
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
 }

celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit); 

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius); 

document.querySelector("#current-location-button").addEventListener("click", findLocation);    
document.querySelector("#search-form").addEventListener("submit", handleSubmit);


search("paris");


  

 
 
 


 

  

 
 

