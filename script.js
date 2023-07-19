const apiUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=';
const weatherUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/';

async function getWeatherData(city) {
    const locationResponse = await fetch(`${apiUrl}${city}`);
    const locationData = await locationResponse.json();
    
    if (locationData.length === 0) {
        throw new Error('City not found.');
    }

    const woeid = locationData[0].woeid;
    const weatherResponse = await fetch(`${weatherUrl}${woeid}/`);
    const weatherData = await weatherResponse.json();

    return weatherData;
}

function displayWeatherData(data) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    const location = data.title;
    const temperature = data.consolidated_weather[0].the_temp.toFixed(1) + ' °C';
    const description = data.consolidated_weather[0].weather_state_name;

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
            showError(error.message || 'Failed to fetch weather data.');
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', init);