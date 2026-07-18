document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-card');
    if (form) {
        form.addEventListener('submit', () => {
            form.classList.add('submitting');
        });
    }
});
