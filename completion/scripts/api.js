const API_KEY = 'e139e97392f881ab7de03dca44cf5bc6'; // Replace with your API key

// Fetch JSON data from a local file
export async function fetchHikes() {
    try {
        const response = await fetch('data/hikes.json');
        if (!response.ok) throw new Error('Failed to fetch hikes');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching hikes:', error);
        return [];
    }
}

// Fetch weather data from OpenWeatherMap API
export async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) throw new Error('Failed to fetch weather');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}