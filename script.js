 document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = 'af188b686c326c4e4bc1cef37807425d'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Clear previous results
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = '';
    weatherResult.style.display = 'none'; // Hide previous results

    // Show loading message
    weatherResult.innerHTML = '<p>Loading...</p>';
    weatherResult.style.display = 'block';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Clear loading message
            weatherResult.innerHTML = '';

            // Display weather data
            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            weatherResult.style.display = 'block'; // Show the result

            // Change background color based on weather condition
            changeBackground(data.weather[0].main);
        })
        .catch(error => {
            // Clear loading message
            weatherResult.innerHTML = `<p style="color: red;">${error.message}</p>`;
            weatherResult.style.display = 'block'; // Show error message
        });
});

// Function to change background color based on weather condition
function changeBackground(weatherCondition) {
    const body = document.body;
    switch (weatherCondition) {
        case 'Clear':
            body.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
            break;
        case 'Clouds':
            body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
            break;
        case 'Rain':
            body.style.background = 'linear-gradient(to right, #2980b9, #6dd5ed)';
            break;
        case 'Snow':
            body.style.background = 'linear-gradient(to right, #e0e0e0, #ffffff)';
            break;
        case 'Thunderstorm':
            body.style.background = 'linear-gradient(to right, #34495e, #2c3e50)';
            break;
        default:
            body.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
            break;
    }
}






















