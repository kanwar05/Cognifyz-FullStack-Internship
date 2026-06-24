const taskList = document.querySelector("#taskList");
const taskForm = document.querySelector("#taskForm");
const titleInput = document.querySelector("#title");
const message = document.querySelector("#message");
const totalCount = document.querySelector("#totalCount");
const completedCount = document.querySelector("#completedCount");

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed." }));
    throw new Error(error.message);
  }
  return response.status === 204 ? null : response.json();
}

function setMessage(text, type = "error") {
  message.textContent = text;
  message.className = type === "success" ? "success" : "";
}

function updateSummary(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  totalCount.textContent = tasks.length;
  completedCount.textContent = `${completed} completed`;
}

async function loadTasks() {
  taskList.innerHTML = `<div class="loading-state">Loading tasks from the API...</div>`;

  try {
    const tasks = await request("/api/tasks");
    updateSummary(tasks);

    if (!tasks.length) {
      taskList.innerHTML = `<div class="empty-state">No tasks yet. Add one above and it will appear here right away.</div>`;
      return;
    }

    taskList.innerHTML = tasks.map((task) => `
      <article class="task">
        <label>
          <input type="checkbox" ${task.completed ? "checked" : ""} data-action="toggle" data-id="${task.id}">
          <span class="${task.completed ? "done" : ""}">${task.title}</span>
        </label>
        <button type="button" data-action="delete" data-id="${task.id}">Remove</button>
      </article>
    `).join("");
  } catch (error) {
    taskList.innerHTML = `<div class="empty-state">I could not load the task list. Please check the server and try again.</div>`;
    setMessage(error.message);
  }
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("", "success");

  if (titleInput.value.trim().length < 3) {
    setMessage("Please write a task title with at least 3 characters.");
    titleInput.focus();
    return;
  }

  try {
    await request("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: titleInput.value }),
    });
    setMessage("Task added. The list below was refreshed from the API.", "success");
    titleInput.value = "";
    await loadTasks();
  } catch (error) {
    setMessage(error.message);
  }
});

taskList.addEventListener("click", async (event) => {
  const action = event.target.dataset.action;
  const id = event.target.dataset.id;
  if (!action) return;

  try {
    if (action === "delete") {
      await request(`/api/tasks/${id}`, { method: "DELETE" });
      setMessage("Task removed from the API list.", "success");
    }

    if (action === "toggle") {
      const title = event.target.closest(".task").querySelector("span").textContent;
      await request(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, completed: event.target.checked }),
      });
      setMessage(event.target.checked ? "Nice, that task is marked complete." : "Task moved back to active.", "success");
    }

    await loadTasks();
  } catch (error) {
    setMessage(error.message);
  }
});

loadTasks();
