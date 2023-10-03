document.addEventListener('DOMContentLoaded', () => {
    // Select the avatar preview element
const avatarPreview = document.querySelector('.avatar-preview');
const avatarImage = document.getElementById('avatar-image');
const avatarUpload = document.getElementById('avatar-upload');

// Add a click event listener to the avatar preview
avatarPreview.addEventListener('click', () => {
    // Trigger the file input click event
    avatarUpload.click();
});

// Add an event listener to handle avatar image selection
avatarUpload.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        // If a file is selected, set it as the avatar image source
        avatarImage.src = URL.createObjectURL(selectedFile);
    }
});
});
