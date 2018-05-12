var title = document.querySelector("#title");
var text = document.querySelector("#todo-textarea");
var date = document.querySelector("#date");
var time = document.querySelector("#time");
var submit = document.querySelector("#button-add");
submit.addEventListener("click", addTask);
var tasks;
var id;

// check if local storag set with 'task'
if (localStorage.getItem("task")) {
  tasks = JSON.parse(localStorage.getItem("task"));
  console.log("ON LOAD: tasks not empty");
  id = tasks.length;
  window.onload = loadAll;
} else {
  tasks = [];
  id = 0;
  console.log("*ON LOAD* tasks empty");
}

// Collects all the info from the form and creats new task
function addTask() {
  validate();
  if (validate(title.value, text.value, date.value, time.value)) {
    // Cahnge the date format
    var newDate = new Date(date.value);
    var changedDate =
      newDate.getDate() +
      "/" +
      (newDate.getMonth() + 1) +
      "/" +
      newDate.getFullYear();

    // Add new task to the tasks array
    tasks.push(new Task(title.value, text.value, changedDate, time.value, id));
    console.log("*ADD TO ARRAY* new task added to the array");

    // Add the tasks array to the local storage
    localStorage.setItem("task", JSON.stringify(tasks));
    console.log("*ADD TO LOCAL STORAGE* array added to LOCAL STORAGE");

    // Add the task to board
    tasks = JSON.parse(localStorage.getItem("task"));
    draw(tasks.length - 1);
    console.log(
      "*ADD SINGLE TASK* SINGLE TASK added to board (DOM), index: " +
        (tasks.length - 1)
    );

    // Increment id
    id++;
    console.log("ID incremented by 1: " + id);

    // Clear the form
    clear(title);
    clear(text);
    clear(date);
    clear(time);
    console.log("*CLEAR FORM* form cleard");
  }
}

// Validation Function
var inputItems = document.querySelectorAll(".form-item");
function validate(title, text, date, time) {
  for (var i = 0; i < inputItems.length; i++) {
    if (inputItems[i].value == "") {
      inputItems[i].classList.add("not-valid-input");
      if (inputItems[i].id == "title") {
        inputItems[i].placeholder = "Please Enter Title";
      }
      if (inputItems[i].id == "todo-textarea") {
        inputItems[i].placeholder = "Please Enter Your Task";
      }
    } else {
      inputItems[i].classList.remove("not-valid-input");
    }
  }
  if (!title || !text || !date || !time) {
    return false;
  } else {
    return true;
  }
}

// Function draw task on board
function draw(item) {
  if (tasks) {
    taskStructure(
      tasks[item].title,
      tasks[item].bodyText,
      tasks[item].targetDate,
      tasks[item].targetTime,
      tasks[item].id
    );
  }
}

// function to load all the tasks to the dom on page refresh
function loadAll() {
  for (var i = 0; i < tasks.length; i++) {
    draw(i);
  }
  console.log("ON LOAD all tasks loaded to board");
}

// function to remove task
function removeTask(Event) {
  Event.path[2].remove();
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == Event.target.id) {
      console.log(
        "*REMOVED* task id: " + tasks[i].id + " task title: " + tasks[i].title
      );
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem("task", JSON.stringify(tasks));
}

//Task HTML Structure
var taskContainer = document.querySelector(".todo-items");
function taskStructure(title, text, date, time, id) {
  //create container div
  var taskDiv = document.createElement("div");
  taskContainer.appendChild(taskDiv);
  taskDiv.classList.add("task");

  // create task head div
  var taskHeadDiv = document.createElement("div");
  taskDiv.appendChild(taskHeadDiv);
  taskHeadDiv.classList.add("task-head");

  //create task title span
  var taskTitleSpan = document.createElement("span");
  taskHeadDiv.appendChild(taskTitleSpan);
  taskTitleSpan.classList.add("task-title");
  taskTitleSpan.innerText = title;

  //create task close span
  var taskCloseSpan = document.createElement("span");
  taskHeadDiv.appendChild(taskCloseSpan);
  taskCloseSpan.classList.add("task-close");
  taskCloseSpan.innerText = "X";
  taskCloseSpan.setAttribute("id", id);
  taskCloseSpan.addEventListener("click", removeTask);

  // create task text div
  var taskTextDiv = document.createElement("div");
  taskDiv.appendChild(taskTextDiv);
  taskTextDiv.classList.add("task-text");

  var taskTextP = document.createElement("p");
  taskTextDiv.appendChild(taskTextP);
  taskTextP.innerText = text;

  // create task date div
  var taskDateDiv = document.createElement("div");
  taskDiv.appendChild(taskDateDiv);
  taskDateDiv.classList.add("task-date");

  var taskDateP = document.createElement("p");
  taskDateDiv.appendChild(taskDateP);
  taskDateP.innerText = date;

  // create task time div
  var taskTimeDiv = document.createElement("div");
  taskDiv.appendChild(taskTimeDiv);
  taskTimeDiv.classList.add("task-time");

  var taskTimeP = document.createElement("p");
  taskTimeDiv.appendChild(taskTimeP);
  taskTimeP.innerText = time;
}
