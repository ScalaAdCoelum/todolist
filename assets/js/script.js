document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const themeSelector = document.getElementById('theme');
    const pinImage = document.getElementById('pin-image');

    function setTheme(theme) {
        document.body.className = `theme-${theme}`;
        switch (theme) {
            case 'under-the-sea':
                pinImage.src = 'assets/images/pin-2.png';
                break;
            case 'woodland-creatures':
                pinImage.src = 'assets/images/pin-4.png';
                break;
            case 'outer-space':
                pinImage.src = 'assets/images/pin-1.png';
                break;
            default:
                pinImage.src = 'assets/images/pin-3.png';
        }
    }

    themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;
        setTheme(selectedTheme);
    });

    setTheme('default');

    // Function to save the selected theme to local storage
    function saveThemeToLocalStorage(theme) {
        localStorage.setItem('selectedTheme', theme);
    }

    // Function to load the selected theme from local storage
    function loadThemeFromLocalStorage() {
        return localStorage.getItem('selectedTheme') || 'default';
    }

    // Function to set the theme based on the loaded value
    function applyThemeFromLocalStorage() {
        const selectedTheme = loadThemeFromLocalStorage();
        setTheme(selectedTheme);
        themeSelector.value = selectedTheme;
    }

    // Set the initial theme based on local storage or default
    applyThemeFromLocalStorage();

    // Event listener to update and save the theme when it changes
    themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;
        setTheme(selectedTheme);
        saveThemeToLocalStorage(selectedTheme);
    });

    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
        const tasks = Array.from(taskList.children).map((taskItem) => {
            return {
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.classList.contains('completed')
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from local storage
    function loadTasksFromLocalStorage() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach((savedTask) => {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            listItem.innerHTML = `
                <img src="assets/images/favicon.png" class="task-icon">
                <span>${savedTask.text}</span>
                <button class="complete"><i class="${savedTask.completed ? 'ri-checkbox-circle-line' : 'ri-checkbox-blank-circle-line'}"></i></button>
                <button class="delete"><i class="ri-delete-bin-line"></i></button>
            `;
            taskList.appendChild(listItem);

            const completeButton = listItem.querySelector('button.complete');
            completeButton.addEventListener('click', function () {
                const icon = completeButton.querySelector('i');
                icon.classList.toggle('ri-checkbox-blank-circle-line');
                icon.classList.toggle('ri-checkbox-circle-line');
                listItem.classList.toggle('completed');
                saveTasksToLocalStorage();
            });

            const deleteButton = listItem.querySelector('button.delete');
            deleteButton.addEventListener('click', function () {
                listItem.remove();
                saveTasksToLocalStorage();
            });
        });
    }

    // Load tasks from local storage when the page loads
    loadTasksFromLocalStorage();

    // Add a task and save it to local storage
    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            listItem.innerHTML = `
                <img src="assets/images/favicon.png" class="task-icon">
                <span>${taskText}</span>
                <button class="complete"><i class="ri-checkbox-blank-circle-line"></i></button>
                <button class="delete"><i class="ri-delete-bin-line"></i></button>
            `;

            taskList.appendChild(listItem);
            taskInput.value = '';

            const completeButton = listItem.querySelector('button.complete');
            completeButton.addEventListener('click', function () {
                const icon = completeButton.querySelector('i');
                icon.classList.toggle('ri-checkbox-blank-circle-line');
                icon.classList.toggle('ri-checkbox-circle-line');
                listItem.classList.toggle('completed');
                saveTasksToLocalStorage();
            });

            const deleteButton = listItem.querySelector('button.delete');
            deleteButton.addEventListener('click', function () {
                listItem.remove();
                saveTasksToLocalStorage();
            });
            addEditButton(listItem);
            saveTasksToLocalStorage(); // Save the new task to local storage
        }
    });

    // Function to create an editable input field for task text
    function createEditableInput(text) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        input.classList.add('editable-input');
        return input;
    }

    // Function to add an "Edit" button to a task item
    function addEditButton(taskItem) {
        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML = '<i class="ri-edit-line"></i>';
        taskItem.appendChild(editButton);

        // Add a click event listener to the "Edit" button
        editButton.addEventListener('click', function () {
            const taskText = taskItem.querySelector('span');
            const editableInput = createEditableInput(taskText.textContent);

            // Replace the task text with the editable input field
            taskItem.replaceChild(editableInput, taskText);
            editableInput.focus();

            // Event listener to save edited text when Enter key is pressed or input loses focus
            editableInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    taskText.textContent = editableInput.value;
                    taskItem.replaceChild(taskText, editableInput);
                    saveTasksToLocalStorage(); // Save the edited task text
                }
            });

            editableInput.addEventListener('blur', function () {
                taskText.textContent = editableInput.value;
                taskItem.replaceChild(taskText, editableInput);
                saveTasksToLocalStorage(); // Save the edited task text
            });
        });
    }

    // Add an "Edit" button to each task item
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(function (taskItem) {
        addEditButton(taskItem);
    });


    const musicToggle = document.getElementById('music-toggle');
    const musicOffButton = document.getElementById('music-off');
    const music = document.getElementById('music');

    // Start with music off
    music.pause();
    musicOffButton.style.display = 'none';

    musicToggle.addEventListener('click', () => {
        music.play();
        musicToggle.style.display = 'none';
        musicOffButton.style.display = 'inline-block';
    });

    musicOffButton.addEventListener('click', () => {
        music.pause();
        musicToggle.style.display = 'inline-block';
        musicOffButton.style.display = 'none';
    });
});
