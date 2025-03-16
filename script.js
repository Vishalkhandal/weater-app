const API_KEY = "f9de90ff056bd503d4777eedeefdad32";
const inputCityName = document.querySelector("#input-city-name");
const searchCityButton = document.querySelector("#btn-search");
const btnToggle = document.querySelector("#btnToggle");
const cityName = document.querySelector("#city-name");
const currentDay = document.querySelector("#current-day");
const currentDate = document.querySelector("#current-date");
const cityTemp = document.querySelector("#city-temp");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector("#weather-description");
const feelsLike = document.querySelector("#feels-like");
const windSpeed = document.querySelector("#wind-speed");
const humidity = document.querySelector("#humidity");
const seaLevel = document.querySelector("#sea-level");
const visibility = document.querySelector("#visibility");

console.log(cityName);
console.log(cityTemp);

async function getData(city) {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error("City not found! Please try again.");
        }
        return await response.json();

    } catch (error) {
        alert(error.message);
    }
}

async function updateWeather() {
    const value = inputCityName.value.trim();
    if (!value) return alert("Please enter a city name!");

    const result = await getData(value);
    console.log(result);
    if (!result) return;

    console.log(result.name);

    cityName.innerText = result.name;

    const now = new Date();
    currentDay.textContent = now.toLocaleString('en-US', { weekday: 'long' });
    currentDate.textContent = now.toLocaleDateString();

    weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${result.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt", `${result.weather[0].description}`);

    cityTemp.textContent = `${result.main.temp}°C`;
    weatherDescription.textContent = result.weather[0].description;
    feelsLike.textContent = `Feels like: ${result.main.feels_like}°C`;

    windSpeed.textContent = `${result.wind.speed} km/h`;
    humidity.textContent = `${result.main.humidity}`;
    seaLevel.textContent = `${result.main.sea_level} m`;
    visibility.textContent = result.visibility;

    // Convert Unix timestamps to readable time
    sunrise.textContent = `${new Date(result.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunset.textContent = `${new Date(result.sys.sunset * 1000).toLocaleTimeString()}`;




    // Clear input field after search
    inputCityName.value = "";
}

// Search button click event
searchCityButton.addEventListener("click", updateWeather);
// searchCityButton.addEventListener("click", getData);

// Allow "Enter" key to search
inputCityName.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        updateWeather();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const themeSwitch = document.getElementById("themeSwitch");
    const body = document.body;

    // Check saved theme
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-theme");
        themeSwitch.checked = true;
    }

    // Toggle Theme
    themeSwitch.addEventListener("change", function () {
        if (this.checked) {
            body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    });
});
