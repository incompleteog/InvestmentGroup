const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeatherData(city) {
    const response = await fetch(`${weatherApiUrl}?q=${city}&units=metric`);
    const data = await response.json();
    return data;
}

function displayWeatherData(data) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    const location = data.name + ', ' + data.sys.country;
    const temperature = data.main.temp + ' °C';
    const description = data.weather[0].description;

    locationElement.textContent = `Location: ${location}`;
    temperatureElement.textContent = `Temperature: ${temperature}`;
    descriptionElement.textContent = `Description: ${description}`;
}

function showError(message) {
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
}

function init() {
    const city = 'London'; // Replace 'YOUR_CITY_NAME' with the desired city name
    getWeatherData(city)
        .then(displayWeatherData)
        .catch((error) => {
            showError('Failed to fetch weather data.');
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', init);