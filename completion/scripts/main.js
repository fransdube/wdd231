import { fetchHikes, fetchWeather } from './api.js';
import { setupModal, showModal } from './modal.js';
import { saveToLocalStorage, getFromLocalStorage } from './utils.js';

// DOM Elements
const hikeCalendar = document.getElementById('hike-calendar');
const featuredHikes = document.getElementById('featured-hikes');
const joinForm = document.getElementById('join-form');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Initialize modal
setupModal();

// Load hikes and display them on the home page
async function loadFeaturedHikes() {
  const hikes = await fetchHikes();
  if (hikes.length === 0) {
    featuredHikes.innerHTML = '<p>No upcoming hikes at the moment.</p>';
    return;
  }

  // Display the first 3 hikes as featured
  const featured = hikes.slice(0, 3);
  featured.forEach(hike => {
    const hikeElement = document.createElement('div');
    hikeElement.classList.add('featured-hike');
    hikeElement.innerHTML = `
      <h3>${hike.name}</h3>
      <p>Date: ${hike.date}</p>
      <p>Difficulty: ${hike.difficulty}</p>
      <p>Location: ${hike.location}</p>
    `;
    featuredHikes.appendChild(hikeElement);
  });
}

// Load hikes and display them on the hike schedule page
async function loadHikes() {
  const hikes = await fetchHikes();
  if (hikes.length === 0) {
    hikeCalendar.innerHTML = '<p>No hikes available at the moment.</p>';
    return;
  }

  hikes.forEach(async (hike, index) => {
    const weather = await fetchWeather(hike.location);
    const hikeElement = document.createElement('div');
    hikeElement.classList.add('hike');
    hikeElement.innerHTML = `
      <h3>${hike.name}</h3>
      <p>Date: ${hike.date}</p>
      <p>Difficulty: ${hike.difficulty}</p>
      <p>Location: ${hike.location}</p>
      <p>Duration: ${hike.duration || 'N/A'}</p>
      <p>Weather: ${weather ? `${weather.main.temp}°C, ${weather.weather[0].description}` : 'N/A'}</p>
      <div class="buttons">
        <button class="details-button" data-index="${index}">View Details</button>
        <button class="rsvp-button" data-index="${index}">RSVP</button>
      </div>
    `;
    hikeCalendar.appendChild(hikeElement);
  });

  // Add event listeners to details buttons
  document.querySelectorAll('.details-button').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const hike = hikes[index];
      const modalContent = `
        <h3>${hike.name}</h3>
        <p>Date: ${hike.date}</p>
        <p>Difficulty: ${hike.difficulty}</p>
        <p>Location: ${hike.location}</p>
        <p>Duration: ${hike.duration || 'N/A'}</p>
        <p>Description: ${hike.description || 'No description available.'}</p>
      `;
      showModal(modalContent);
    });
  });

  // Add event listeners to RSVP buttons
  document.querySelectorAll('.rsvp-button').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const hike = hikes[index];
      const member = getFromLocalStorage('member');
      if (member) {
        alert(`Thank you, ${member.name}! You have RSVP'd for ${hike.name} on ${hike.date}.`);
      } else {
        alert('Please join the club first to RSVP for hikes.');
      }
    });
  });
}

// Handle form submission for joining the club
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = joinForm.name.value;
    const email = joinForm.email.value;

    // Save to localStorage
    saveToLocalStorage('member', { name, email });

    // Show confirmation message
    alert(`Thank you, ${name}! You have successfully joined the club.`);
    joinForm.reset();
  });
}

// Toggle mobile menu
if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
  });
}

// Load featured hikes on the home page
if (featuredHikes) {
  loadFeaturedHikes();
}

// Load hikes on the hike schedule page
if (hikeCalendar) {
  loadHikes();
}