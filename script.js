const apiKey = '0106f784817d49fc8d461457231407';

document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    if (city === '') {
        showError('Please enter a city name.');
        return;
    }
    fetchWeather(city);
});

function fetchWeather(city) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                handleError(data.error);
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            handleError({ message: 'Please enter a valid city name' });
        });
}

function displayWeather(data) {
    document.getElementById('location').textContent = data.location.name;
    document.getElementById('temperature').textContent = `${data.current.temp_c} °C`;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('icon').src = `http:${data.current.condition.icon}`;
    document.getElementById('weather-card').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

function handleError(error) {
    showError(error.message);
    document.getElementById('weather-card').classList.add('hidden');
}

function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove('hidden');
    errorMessageDiv.style.opacity = 1;
}