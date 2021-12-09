

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
function getForecastDay(timestamp) {
  let date = new Date(timestamp*1000);
  let days =[
    "Sun", 
    "Mon",
    "Tue", 
    "Wed", 
    "Thur", 
    "Fri", 
    "Sat"];
    let day = days[date.getDay()];
    return `${day}`;

}
function dispalyForecast(response){
  let forecast = document.querySelector("#forecastPreview");
  let forecastHTML = `<div class = "row">`;
  let dailyForecast = response.data.daily;
  dailyForecast.forEach(function(forecast, index) {
    if (index < 6) {
      
    forecastHTML = forecastHTML + `
                <div class="col-2">
                <div id="days">
                    ${getForecastDay(forecast.dt)}
                    </div>
                    <div>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" width="42" id="forecast-icon">
                    </div>
                    <div class="maxMin">
                        <span class="max">${Math.round(forecast.temp.max)}°</span>
                        <span class="min">/${Math.round(forecast.temp.min)}°</span>
                    </div>
                </div>`
    }
  });
  

  forecast.innerHTML = forecastHTML + `</div>`;}


function getForecast(coordinates){
    let apiKey =  `19351561bdce0a99202ae9e49984792f`
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(dispalyForecast).catch(function(error){
        alert("Oops, please enter a valid city!🤕")
    
    });
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
   getForecast(response.data.list[0].coord); 
  }

function search(city){
  let apiKey= "19351561bdce0a99202ae9e49984792f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature).catch(function(error){
        alert("Oops, please enter a valid city name!🤕")
    
    });;

}

function handleSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#city-value").value;
  search(city);
 }



celsiusTemperature = null;
    
document.querySelector("#search-form").addEventListener("submit", handleSubmit);


search("paris");


  

 
 
 


 

  

 
 

