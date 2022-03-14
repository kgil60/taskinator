let taskList = document.getElementById("tasks-to-do");
let formEl = document.getElementById("task-form");

function addTaskHandler(e) {
    e.preventDefault();
    
    let taskItem = document.createElement("li");
    taskItem.textContent = "A new task has been added";
    taskItem.className = 'task-item';
    taskList.appendChild(taskItem);
}

formEl.addEventListener("submit", addTaskHandler);