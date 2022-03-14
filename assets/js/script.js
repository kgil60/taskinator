let taskList = document.getElementById("tasks-to-do");
let buttonEl = document.querySelector("#save-task");

function addTaskHandler() {
    let taskItem = document.createElement("li");
    taskItem.textContent = "A new task has been added";
    taskItem.className = 'task-item';
    taskList.appendChild(taskItem);
}

buttonEl.addEventListener("click", addTaskHandler);