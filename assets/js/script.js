let taskList = document.getElementById("tasks-to-do");
let formEl = document.getElementById("task-form");

function addTaskHandler(e) {
    e.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    let taskItem = document.createElement("li");
    taskItem.className = 'task-item';

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskNameInput}</h3><span class='task-type'>${taskTypeInput}</span>`;
    taskItem.appendChild(taskInfoEl);

    taskList.appendChild(taskItem);
}

formEl.addEventListener("submit", addTaskHandler);