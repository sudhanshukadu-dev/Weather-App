// script.js

const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('cityInput');
const cityName = document.querySelector('h3');
const temperature = document.querySelector('h1');
const weatherDescription = document.querySelector('.card-text');
const weatherIcon = document.getElementById('weatherIcon');
const centerScreenDiv = document.querySelector('.center-screen');  // Accessing the div with the class 'center-screen'

// Function to map weather condition to an icon and background color
function getCustomIcon(description) {
    const weatherIcons = {
        "clear sky": "icons/sunny.svg",
        "few clouds": "icons/partly-cloudy.svg",
        "scattered clouds": "icons/partly-cloudy.svg",
        "broken clouds": "icons/cloudy.svg",
        "shower rain": "icons/rainy.svg",
        "rain": "icons/rainy.svg",
        "thunderstorm": "icons/thunderstorm.svg",
        "snow": "icons/snow.svg",
        "mist": "icons/mist.svg",
    };

    // Default icon if no match is found
    return weatherIcons[description.toLowerCase()] || "icons/cloudy.svg";
}

// Function to map the weather icon to background color
function getBackgroundColorByIcon(iconSrc) {
    const bgColors = {
        "icons/sunny.svg": "#FF4141",       
        "icons/partly-cloudy.svg": "#FFB641", 
        "icons/cloudy.svg": "#F5FEFF",      
        "icons/rainy.svg": "#418DFF",       
        "icons/thunderstorm.svg": "#9041FF", 
        "icons/snow.svg": "#F5FEFF",        
        "icons/mist.svg": "#F5FEFF",        
        "icons/default.svg": "#F0F0F0",     
    };

    // Return background color based on icon
    return bgColors[iconSrc] || "#F0F0F0"; // Default grey
}

// Function to fetch weather data from OpenWeather API
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);  // Log the entire API response for debugging
        const description = data.weather[0].description;

        if (data.cod === 200) {
            cityName.innerText = data.name;  // Update city name
            temperature.innerText = `${data.main.temp}°C`;  // Update temperature
            weatherDescription.innerText = description;  // Update description

            // Set the custom weather SVG icon based on the description
            const customIcon = getCustomIcon(description);
            weatherIcon.src = customIcon;  // Update icon image

            // Set the background color based on the icon
            const bgColor = getBackgroundColorByIcon(customIcon);
            centerScreenDiv.style.backgroundColor = bgColor;  // Change background color of center-screen div

        } else {
            alert('City not found!');
        }
    } catch (error) {
        alert('Error fetching weather data.');
    }
}

// Event listener for the form submission
getWeatherButton.addEventListener('click', function (event) {
    event.preventDefault();  // Prevent the form from submitting and refreshing the page
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);  // Get weather for the input city
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch the weather for Dahanu by default on page load
getWeather('Dahanu');
