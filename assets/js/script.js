let taskList = document.getElementById("tasks-to-do");
let formEl = document.getElementById("task-form");
let taskIdCounter = 0;
let pageContentEl = document.getElementById("page-content");
let tasksInProgressEl = document.getElementById("tasks-in-progress");
let tasksCompletedEl = document.getElementById("tasks-completed");

function taskFormHandler(e) {
    e.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert('Please make sure task form is filled out');
        return false;
    }

    formEl.reset();

    let isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        let taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        }
        createTaskEl(taskDataObj);
    }
};

function createTaskEl(taskDataObj) {
    let taskItem = document.createElement("li");
    taskItem.className = 'task-item';

    taskItem.setAttribute("data-task-id", taskIdCounter);

    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}</h3><span class='task-type'>${taskDataObj.type}</span>`;
    taskItem.appendChild(taskInfoEl);

    taskList.appendChild(taskItem);

    let taskActionsEl = createTaskActions(taskIdCounter);
    taskItem.appendChild(taskActionsEl);
    taskList.appendChild(taskItem);

    taskIdCounter++;
}

function createTaskActions(taskId) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    let statusOptions = ["To Do", "In Progress", "Completed"];
    for (let i=0; i<statusOptions.length; i++) {
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusOptions[i];
        statusOptionEl.setAttribute("value", statusOptions[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

function completeEditTask(taskName, taskType, taskId) {
    console.log(taskName,  taskType, taskId);

    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute('data-task-id');
    document.getElementById("save-task").textContent = "Add Task";
}

formEl.addEventListener("submit", taskFormHandler);

function taskButtonHandler(e) {
    if (e.target.matches(".edit-btn")) {
        let taskId = e.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (e.target.matches(".delete-btn")) {
        // console.log("delete button");
        let taskId = e.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

function deleteTask(taskId) {
    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    taskSelected.remove();
}

function editTask(taskId) {
    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.getElementById("save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

function taskStatusChangeHandler(e) {
    let taskId = e.target.getAttribute('data-task-id');
    let statusValue = e.target.value.toLowerCase();
    let taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    if (statusValue === "to do") {
        taskList.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
}

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);