// Fetch and display weather data
const apiKey = 'e139e97392f881ab7de03dca44cf5bc6'; // Replace with your OpenWeatherMap API key
const city = 'Johannesburg, ZA'; // Replace with your chamber location

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Weather data not available.');
        }
        const data = await response.json();
        console.log(data); // Log the API response for debugging
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherDiv = document.getElementById('weather-data');
        weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function capitalize(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-data');
    if (!data.list || data.list.length === 0) {
        weatherDiv.innerHTML = `<p>Weather data not available.</p>`;
        return;
    }

    const current = data.list[0];
    const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 3); // Get 3-day forecast

    // Current weather
    weatherDiv.innerHTML = `
        <p><strong>Current Temperature:</strong> ${Math.round(current.main.temp)}°F</p>
        <p><strong>Conditions:</strong> ${current.weather.map(w => capitalize(w.description)).join(', ')}</p>
    `;

    // 3-day forecast
    weatherDiv.innerHTML += `<h3>3-Day Forecast</h3>`;
    forecast.forEach(day => {
        weatherDiv.innerHTML += `
            <p><strong>${new Date(day.dt_txt).toLocaleDateString()}:</strong> ${Math.round(day.main.temp)}°F</p>
        `;
    });
}

// Fetch and display member spotlights
async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Member data not available.');
        }
        const data = await response.json();
        console.log(data); // Log the member data for debugging
        displaySpotlights(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
        const spotlightDiv = document.getElementById('spotlight-cards');
        spotlightDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displaySpotlights(members) {
    const spotlightDiv = document.getElementById('spotlight-cards');
    if (!members || members.length === 0) {
        spotlightDiv.innerHTML = `<p>No member data available.</p>`;
        return;
    }

    // Filter gold and silver members
    const goldSilverMembers = members.filter(member => member.membershipLevel >= 2);

    // Randomly select 2-3 members
    const spotlights = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Display spotlight cards
    spotlightDiv.innerHTML = '';
    spotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${member.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>
        `;
        spotlightDiv.appendChild(card);
    });
}

// Display copyright year and last modified date
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Load weather and spotlights on page load
getWeather();
getSpotlights();