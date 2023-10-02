document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const pinImage = document.getElementById('pin-image');
    let isDragging = false;
    let currentTask = null;
    let offsetX, offsetY;

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

    const themeSelector = document.getElementById('theme');
    themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;
        setTheme(selectedTheme);
    });

    setTheme('default');

    function deleteTask(listItem) {
        listItem.remove();
    }

    function toggleCompleted(listItem) {
        listItem.classList.toggle('completed');
    }

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

            listItem.draggable = true;

            listItem.addEventListener('dragstart', function (e) {
                isDragging = true;
                currentTask = e.target;
                offsetX = e.clientX - currentTask.offsetLeft;
                offsetY = e.clientY - currentTask.offsetTop;
            });

            listItem.addEventListener('dragend', function () {
                isDragging = false;
                currentTask = null;
            });

            listItem.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            listItem.addEventListener('drop', function (e) {
                if (currentTask !== null) {
                    taskList.insertBefore(currentTask, listItem);
                }
            });

            taskList.appendChild(listItem);
            taskInput.value = '';

            // Add event listener to the delete button
            const deleteButton = listItem.querySelector('button.delete');
            deleteButton.addEventListener('click', function () {
                deleteTask(listItem);
            });

            // Add event listener to the complete button
            const completeButton = listItem.querySelector('button.complete');
            completeButton.addEventListener('click', function () {
                toggleCompleted(listItem);
            });
        }
    });
});
