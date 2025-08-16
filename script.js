const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  const taskType = document.getElementById("taskType").value;
  const taskPriority = document.getElementById("taskPriority").value;
  const taskDate = document.getElementById("taskDate").value;

  if (taskText === "") return;

  const li = document.createElement("li");
  li.classList.add(taskType, taskPriority);
  li.dataset.date = taskDate;
  li.innerHTML = `
    <span onclick="toggleDone(this)">${taskText}</span>
    <span class="delete" onclick="deleteTask(this)">🗑</span>
  `;
  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

function toggleDone(el) {
  el.parentElement.classList.toggle("done");
  saveTasks();
}

function deleteTask(el) {
  el.parentElement.remove();
  saveTasks();
}

// Salvar tarefas no navegador
function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Carregar tarefas salvas
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) taskList.innerHTML = saved;
}

// Filtrar tarefas por prioridade
function filterTasks(priority) {
  const items = taskList.querySelectorAll("li");
  items.forEach(li => {
    li.style.display = (priority === "todas" || li.classList.contains(priority)) ? "flex" : "none";
  });
}

// Filtrar tarefas por data
function filterByDate(selectedDate) {
  const items = taskList.querySelectorAll("li");
  items.forEach(li => {
    li.style.display = (selectedDate === "" || li.dataset.date === selectedDate) ? "flex" : "none";
  });
}

// Carregar tarefas ao abrir
window.onload = loadTasks;
