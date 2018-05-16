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
