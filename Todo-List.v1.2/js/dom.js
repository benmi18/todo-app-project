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
