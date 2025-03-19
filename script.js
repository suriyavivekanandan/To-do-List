let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("actions");

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "Completed";
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasksToLocalStorage();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
    };

    actionDiv.appendChild(completeBtn);
    actionDiv.appendChild(deleteBtn);
    li.appendChild(actionDiv);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  saveTasksToLocalStorage();
  renderTasks();
  taskInput.value = "";
}

document.addEventListener("DOMContentLoaded", renderTasks);
