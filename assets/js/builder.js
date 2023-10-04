document.addEventListener('DOMContentLoaded', () => {
    // Select the avatar elements
    const avatarImage = document.getElementById('avatar-image');
    const avatarOptions = document.querySelector('.avatar-options');

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
            // Hide the avatar options
            avatarOptions.style.maxHeight = '0px';
        });
    });
});
