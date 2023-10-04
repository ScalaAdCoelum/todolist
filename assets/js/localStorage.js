// Save tasks to local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

const tasks = loadTasksFromLocalStorage();

// Add a new task to the tasks array
function addTask(taskText) {
    const task = {
        text: taskText,
        completed: false,
    };
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
}
