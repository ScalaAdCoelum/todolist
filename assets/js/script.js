document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const themeSelector = document.getElementById('theme');
    const pinImage = document.getElementById('pin-image'); // Added this line

    // Function to set the theme based on user selection
    function setTheme(theme) {
        document.body.className = `theme-${theme}`;
        switch (theme) {
            case 'under-the-sea':
                pinImage.src = 'assets/images/pin-2.png'; // Replace with your under the sea pin image source
                break;
            case 'woodland-creatures':
                pinImage.src = 'assets/images/pin-4.png'; // Replace with your woodland creatures pin image source
                break;
            case 'outer-space':
                pinImage.src = 'assets/images/pin-1.png'; // Replace with your outer space pin image source
                break;
            default:
                pinImage.src = 'assets/images/pin-3.png'; // Replace with your default pin image source
        }
    }

    // Event listener for theme selection
    themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;
        setTheme(selectedTheme);
    });

    // Default theme on page load
    setTheme('default');

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            listItem.innerHTML = `
                <img src="assets/images/favicon.png" class="task-icon">
                <span>${taskText}</span>
                <button class="delete"><i class="ri-delete-bin-line"></i></button>
                <button class="complete"><i class="ri-check-double-line"></i></button>
            `;

            taskList.appendChild(listItem);
            taskInput.value = '';

            // Add event listener to the delete button
            const deleteButton = listItem.querySelector('button.delete');
            deleteButton.addEventListener('click', function () {
                listItem.remove();
            });

            // Add event listener to the complete button
            const completeButton = listItem.querySelector('button.complete');
            completeButton.addEventListener('click', function () {
                listItem.classList.toggle('completed');
            });
        }
    });
});
