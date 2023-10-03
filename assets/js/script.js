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

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            listItem.innerHTML = `
                <img src="assets/images/favicon.png" class="task-icon">
                <span>${taskText}</span>
                <button class="complete">Complete</button>
            `;

            taskList.appendChild(listItem);
            taskInput.value = '';

            const completeButton = listItem.querySelector('button.complete');
            completeButton.addEventListener('click', function () {
                listItem.classList.toggle('completed');
            });
        }
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
