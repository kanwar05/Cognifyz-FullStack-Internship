const taskList = document.querySelector("#taskList");
const taskForm = document.querySelector("#taskForm");
const titleInput = document.querySelector("#title");
const message = document.querySelector("#message");

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

async function loadTasks() {
  const tasks = await request("/api/tasks");
  taskList.innerHTML = tasks.map((task) => `
    <article class="task">
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""} data-action="toggle" data-id="${task.id}">
        <span class="${task.completed ? "done" : ""}">${task.title}</span>
      </label>
      <button data-action="delete" data-id="${task.id}">Delete</button>
    </article>
  `).join("");
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  try {
    await request("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: titleInput.value }),
    });
    titleInput.value = "";
    await loadTasks();
  } catch (error) {
    message.textContent = error.message;
  }
});

taskList.addEventListener("click", async (event) => {
  const action = event.target.dataset.action;
  const id = event.target.dataset.id;
  if (!action) return;

  if (action === "delete") {
    await request(`/api/tasks/${id}`, { method: "DELETE" });
  }

  if (action === "toggle") {
    const title = event.target.closest(".task").querySelector("span").textContent;
    await request(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, completed: event.target.checked }),
    });
  }

  await loadTasks();
});

loadTasks();
