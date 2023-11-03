function showDate (timeStamp) {
    let now = new Date(timeStamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    let day = days[now.getDay()];
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;

}

//weather forecast html injection - looping
function showForecast(response) {
    console.log(response.data)
    let forecastElement = document.querySelector("#weather-forecast");

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    let forecastHTML = "";
    days.forEach(function (day) {
        forecastHTML = forecastHTML + 
    `
    <div class="grouping col-3">
            <div class="days">
                <h2 class="prediction min-prediction">${day}</h2>
                <i class="fa-solid fa-cloud-sun icons"></i>
            </div>
            <div class="h1 unit-temp">
                <h1><strong class="degree prediction">23° <span class="min-prediction">16°</span></strong></h1>
            </div>
        </div>
    `;
    });

    forecastElement.innerHTML = forecastHTML;
}

function showTemperature (response) {
   // console.log(response);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#currentTemperature");
  let clearElement = document.querySelector("#clearSky"); 
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;
 
  cityElement.innerHTML = response.data.city
  temperatureElement.innerHTML = Math.round(celsiusTemperature); 
  clearElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  timeElement.innerHTML = showDate(response.data.time * 1000);
  iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  getForecast(response.data.city);
}

function search(city) {
let apiKey = "7f43a2beob8ba3891d0t9638020ee3c9";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}


function searchCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#enter-city");
    search(cityInput.value);
}

function getForecast(city) {
    let apiKey = "7f43a2beob8ba3891d0t9638020ee3c9";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showForecast);

}

function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#currentTemperature");
    celsiusElement.classList.remove("active");
    fahrenheitElement.classList.add("active");
    let fahrenheit = (celsiusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheit); 

}

function displayCelsius(event) {
    event.preventDefault();
    celsiusElement.classList.add("active");
    fahrenheitElement.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", displayCelsius);


search("Lisbon");