const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${task.title}</span>
      <div>
        <button onclick="toggleTask(${index})">✅</button>
        <button class="delete-btn" onclick="deleteTask(${index})">╳</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}
let c=0;
function addTask() {
  const taskTitle = taskInput.value.trim();
  if (taskTitle === "") {
    alert("Please enter a task.");
    return;
  }
  if(taskTitle.length>30){
    alert("Task title should be less than 30 characters");
    return;
  }
  if(c>6){
    alert("You can add only 7 tasks");
    return;
  }
  
  tasks.push({ title: taskTitle, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  c++;
}
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
function deleteTask(index) {
    c--;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
renderTasks();
