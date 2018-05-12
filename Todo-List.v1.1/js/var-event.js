// Set Vars
var title = document.querySelector("#title");
var text = document.querySelector("#todo-textarea");
var date = document.querySelector("#date");
var time = document.querySelector("#time");
var submit = document.querySelector("#button-add");
var clearBtn = document.querySelector("#button-clear");
var inputItems = document.querySelectorAll(".form-item");
var taskContainer = document.querySelector(".todo-items");
var tasks;
var id;

// Set Events
submit.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearForm);
for (var i = 0; i < inputItems.length; i++) {
  // add event listener "input" to all input items
  inputItems[i].addEventListener("input", resetInput);
}
