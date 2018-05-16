// Collects all the info from the form and creats new task
function addTask(Event) {
  // Validate the form
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

  // Return false prevent the page to refresh when submitting the form
  return false;
}

// Remover red border and Reset placeholder when input is entered
function resetInput(e) {
  e.path[0].classList.remove("not-valid-input");
  resetPlaceholder();
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
  //Set animation to fade-out
  Event.path[2].style.animationName = "fade-out";

  //Remove task from the board after 1.6s
  setTimeout(function() {
    Event.path[2].remove();
  }, 1600);

  //Remove task from tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == Event.target.id) {
      console.log(
        "*REMOVED* task id: " + tasks[i].id + " task title: " + tasks[i].title
      );
      tasks.splice(i, 1);
    }
  }

  //Update the local storage with the new tasks array
  localStorage.setItem("task", JSON.stringify(tasks));
}

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
