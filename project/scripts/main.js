// Example of dynamic content insertion
const trails = [
    { name: "Golden Gate Park", difficulty: "Easy", length: "5 miles" },
    { name: "Mount Tamalpais", difficulty: "Hard", length: "10 miles" },
];

const trailsContainer = document.getElementById("trails");

trails.forEach(trail => {
    const trailElement = document.createElement("div");
    trailElement.innerHTML = `
      <h3>${trail.name}</h3>
      <p>Difficulty: ${trail.difficulty}</p>
      <p>Length: ${trail.length}</p>
    `;
    trailsContainer.appendChild(trailElement);
});

// Example of form handling
document.getElementById("membershipForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    alert(`Thank you, ${name}! We'll contact you at ${email}.`);
});