document.addEventListener('DOMContentLoaded', () => {
    // Select the avatar elements
    const avatarImage = document.getElementById('avatar-image');
    const avatarOptions = document.querySelector('.avatar-options');

    // Function to save the selected avatar to local storage
    function saveAvatarToLocalStorage(avatarSrc) {
        localStorage.setItem('selectedAvatar', avatarSrc);
    }

    // Function to load the selected avatar from local storage
    function loadAvatarFromLocalStorage() {
        return localStorage.getItem('selectedAvatar') || 'assets/images/avatar-1.png'; // Default avatar image source
    }

    // Function to set the selected avatar based on the loaded value
    function applyAvatarFromLocalStorage() {
        const selectedAvatar = loadAvatarFromLocalStorage();
        avatarImage.src = selectedAvatar;
    }

    // Set the initial avatar based on local storage or a default
    applyAvatarFromLocalStorage();

    // Add click event listener to the avatar preview
    avatarImage.addEventListener('click', () => {
        // Toggle the visibility of avatar options when the preview is clicked
        if (avatarOptions.style.maxHeight === '0px' || avatarOptions.style.maxHeight === '') {
            avatarOptions.style.maxHeight = '100px'; // Adjust the height as needed
        } else {
            avatarOptions.style.maxHeight = '0px';
        }
    });

    // Add click event listeners to each avatar option
    const avatarOptionImages = document.querySelectorAll('.avatar-option');
    avatarOptionImages.forEach((option) => {
        option.addEventListener('click', () => {
            // Set the clicked avatar as the preview image
            avatarImage.src = option.src;
            saveAvatarToLocalStorage(option.src); // Save the selected avatar to local storage
            // Hide the avatar options
            avatarOptions.style.maxHeight = '0px';
        });
    });
});
