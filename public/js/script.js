// !================ select elemnts ============
let form = document.querySelector(".add-task");
let input = document.querySelector("input");
let ul = document.querySelector("ul");
let total = document.querySelector("#total");
let completed = document.querySelector("#completed");
let remaining = document.querySelector("#remaining");
let error = document.querySelector(".error");



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
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // *================= clear input field ===============
    input.value = "";
});

