let taskList = document.getElementById("tasks-to-do");
let formEl = document.getElementById("task-form");

function taskFormHandler(e) {
    e.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert('Please make sure task form is filled out');
        return false;
    }

    formEl.reset();

    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    createTaskEl(taskDataObj);
};

function createTaskEl(taskDataObj) {
    let taskItem = document.createElement("li");
    taskItem.className = 'task-item';

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
    taskItem.appendChild(taskInfoEl);

    taskList.appendChild(taskItem);
}

formEl.addEventListener("submit", taskFormHandler);