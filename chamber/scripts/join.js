// Set the hidden timestamp field
document.getElementById('timestamp').value = new Date().toISOString();

// Handle modal functionality
const modalLinks = document.querySelectorAll('.modal-link');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('href');
        document.querySelector(modalId).style.display = 'block';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});