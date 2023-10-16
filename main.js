const apiKey = "7e3f21edee540e6110af347b55eb1ab2";
const apiUrl = "https://api.openweathermap.org/data/2.5/";

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getWeatherData(searchbox.value);
  }
}

function getWeatherData(query) {
  fetch(`${apiUrl}weather?q=${query}&units=metric&appid=${apiKey}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeatherData(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  const weatherDescription = document.querySelector('.current .weather');
  weatherDescription.innerText = weather.weather[0].main;

  const hiLow = document.querySelector('.hi-low');
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
