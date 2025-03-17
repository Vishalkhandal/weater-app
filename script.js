const API_KEY = "f9de90ff056bd503d4777eedeefdad32";
const inputCityName = document.querySelector("#input-city-name");
const searchCityButton = document.querySelector("#btn-search");
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

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Location not found! Please try again.");
        }
        return await response.json();
    } catch (error) {
        alert(error.message);
    }
}

async function updateWeatherByCity(city) {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const result = await getData(BASE_URL);
    if (result) displayWeather(result);
}

async function updateWeatherByCoords(lat, lon) {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const result = await getData(BASE_URL);
    if (result) displayWeather(result);
}

function displayWeather(result) {
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
    humidity.textContent = `${result.main.humidity}%`;
    seaLevel.textContent = result.main.sea_level ? `${result.main.sea_level} m` : "N/A";
    visibility.textContent = `${result.visibility / 1000} km`;
    sunrise.textContent = new Date(result.sys.sunrise * 1000).toLocaleTimeString();
    sunset.textContent = new Date(result.sys.sunset * 1000).toLocaleTimeString();
}

function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                updateWeatherByCoords(latitude, longitude);
            },
            (error) => {
                alert("Location access denied. Please enter a city manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }

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
}

// Fetch weather based on user input
searchCityButton.addEventListener("click", () => {
    const city = inputCityName.value.trim();
    if (city) updateWeatherByCity(city);
    else alert("Please enter a city name!");
});

inputCityName.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = inputCityName.value.trim();
        if (city) updateWeatherByCity(city);
        else alert("Please enter a city name!");
    }
});

// Request location on page load
document.addEventListener("DOMContentLoaded", requestLocation);

