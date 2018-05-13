//*****************************************//
//**Add and Remove Red borders to inputs**//
//***************************************//

// Add border
function addRedBorder(i) {
  inputItems[i].classList.add("not-valid-input");
}
// Remove border
function removeRedBorder() {
  for (var i = 0; i < inputItems.length; i++) {
    inputItems[i].classList.remove("not-valid-input");
  }
}

//******************************************//
//**Add and Remove place holder to inputs**//
//****************************************//

//Reset placeholder
function resetPlaceholder() {
  title.placeholder = "Title";
  text.placeholder = "My Task";
}

// New placeholder
function newPlaceholder() {
  title.placeholder = "Please Enter Title";
  text.placeholder = "Please Enter Task";
}

//******************//
//**Local Storage**//
//****************//

// Check if local storag set with 'task'
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

//********************//
//**Clear functions**//
//******************//

// Clear value from input
function clear(item) {
  item.value = null;
}

// Clear all form values
function clearForm(e) {
  e.preventDefault();
  clear(title);
  clear(text);
  clear(date);
  clear(time);
  removeRedBorder();
  resetPlaceholder();
}

//***************//
//**Validation**//
//*************//

function validate(title, text, date, time) {
  for (var i = 0; i < inputItems.length; i++) {
    //start validation
    if (inputItems[i].value == "") {
      addRedBorder(i);
      newPlaceholder();
    } else {
      removeRedBorder();
      resetPlaceholder();
    }
  }
  if (!title || !text || !date || !time) {
    return false;
  } else {
    return true;
  }
}

//******************//
//**Draw the task**//
//****************//

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

//****************************//
//**New task HTML structure**//
//**************************//

//The structure
function taskStructure(title, text, date, time, id) {
  //create container div element
  var taskDiv = document.createElement("div");
  taskContainer.appendChild(taskDiv);
  taskDiv.classList.add("task");

  // create task head div element
  var taskHeadDiv = document.createElement("div");
  taskDiv.appendChild(taskHeadDiv);
  taskHeadDiv.classList.add("task-head");

  //create task title span element
  var taskTitleSpan = document.createElement("span");
  taskHeadDiv.appendChild(taskTitleSpan);
  taskTitleSpan.classList.add("task-title");
  taskTitleSpan.innerText = title;

  //create task close span element
  var taskCloseSpan = document.createElement("span");
  taskHeadDiv.appendChild(taskCloseSpan);
  taskCloseSpan.classList.add("task-close");
  taskCloseSpan.innerText = "X";
  taskCloseSpan.setAttribute("id", id);
  taskCloseSpan.addEventListener("click", removeTask);

  // create task text div element
  var taskTextDiv = document.createElement("div");
  taskDiv.appendChild(taskTextDiv);
  taskTextDiv.classList.add("task-text");

  // create task text P element
  var taskTextP = document.createElement("p");
  taskTextDiv.appendChild(taskTextP);
  taskTextP.innerText = text;

  // create task date div element
  var taskDateDiv = document.createElement("div");
  taskDiv.appendChild(taskDateDiv);
  taskDateDiv.classList.add("task-date");

  // create task date P element
  var taskDateP = document.createElement("p");
  taskDateDiv.appendChild(taskDateP);
  taskDateP.innerText = date;

  // create task time div element
  var taskTimeDiv = document.createElement("div");
  taskDiv.appendChild(taskTimeDiv);
  taskTimeDiv.classList.add("task-time");

  // create task time P element
  var taskTimeP = document.createElement("p");
  taskTimeDiv.appendChild(taskTimeP);
  taskTimeP.innerText = time;
}
