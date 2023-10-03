document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const registrationMessage = document.getElementById('registration-message');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        // You can add your registration logic here (e.g., store the credentials)

        // For simplicity, we'll assume successful registration and provide a message
        registrationMessage.textContent = 'Registration successful. You can now login.';

        // Redirect to index.html
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000); // Redirect after 2 seconds (adjust as needed)
    });
});
