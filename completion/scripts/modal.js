// Modal functionality
export function setupModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Hike Details</h2>
        <div id="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close modal when clicking the close button
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

export function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}