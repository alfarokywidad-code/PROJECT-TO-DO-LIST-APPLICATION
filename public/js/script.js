// !================ select elemnts ============
let form = document.querySelector(".add-task");
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let total = document.querySelector("#total");
let completed = document.querySelector("#completed");
let remaining = document.querySelector("#remaining");
let error = document.querySelector(".error");

//!==================== load tasks from localStorage ========
let tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks === null) {
    tasks = [];
}

// !============ update statistics ===============
function updateStats() {
    total.textContent = tasks.length;
    let completedTasks = tasks.filter(function (task) {
        return task.completed === true;
    });
    completed.textContent = completedTasks.length;
    remaining.textContent = tasks.length - completedTasks.length;
}

// !====================== add new task ======================
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let taskText = input.value.trim();

// *=============== validate empty input =================
    if (taskText === "") {
        error.textContent = "Task cannot be empty";
        return;
    }
    error.textContent = "";

    // *======================== create task object=================
    let task = {
        text: taskText,
        completed: false,
        date: new Date().toLocaleDateString()
    };
    tasks.push(task);

// *============= save tasks to localstorage ================
    localStorage.setItem("tasks",JSON.stringify(tasks));
    displayTasks();
    updateStats();
    // *================= clear input field ===============
    input.value = "";
});

// !=========================== display tasks ======================
function displayTasks() {
    ul.innerHTML = "";
    tasks.forEach(function (task, index) {
        let li = document.createElement("li");
        li.classList.add('list');
        let span = document.createElement("span");
        span.textContent = `${task.text} - ${task.date}`;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        let action = document.createElement("div");
        action.classList.add('container-btn')
        let completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="fa-solid fa-check ri"></i>';
        completeBtn.classList.add('complete-btn');
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-x ri"></i>';
        deleteBtn.classList.add('delet-btn');
        action.appendChild(completeBtn);
        action.appendChild(deleteBtn);

        // *============= toggle task completion status ==============
        completeBtn.addEventListener("click", function () {
            tasks[index].completed =!tasks[index].completed;
            localStorage.setItem("tasks",JSON.stringify(tasks));
            displayTasks();
            updateStats();
        });

        // *====================== delete task ====================
        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            displayTasks();
            updateStats();
        });
        li.appendChild(span);
        li.appendChild(action);
        ul.appendChild(li);
    });
};

displayTasks();
updateStats();