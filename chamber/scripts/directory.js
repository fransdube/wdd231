// Fetch member data and display
async function getMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    const memberCards = document.getElementById('member-cards');
    memberCards.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${member.membershipLevel}</p>
        `;
        memberCards.appendChild(card);
    });
}

// Toggle between grid and list views
document.getElementById('grid-view').addEventListener('click', () => {
    const memberCards = document.getElementById('member-cards');
    memberCards.classList.remove('list');
    memberCards.classList.add('grid');
});

document.getElementById('list-view').addEventListener('click', () => {
    const memberCards = document.getElementById('member-cards');
    memberCards.classList.remove('grid');
    memberCards.classList.add('list');
});

// Display copyright year and last modified date
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Load members on page load
getMembers();