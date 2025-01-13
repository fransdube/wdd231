// Display submitted form data
const urlParams = new URLSearchParams(window.location.search);
const formDataDiv = document.getElementById('form-data');

const fields = ['first-name', 'last-name', 'email', 'phone', 'business-name', 'timestamp'];
fields.forEach(field => {
    const value = urlParams.get(field);
    if (value) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${field.replace('-', ' ')}:</strong> ${value}`;
        formDataDiv.appendChild(p);
    }
});

// Set copyright year and last modified date
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;