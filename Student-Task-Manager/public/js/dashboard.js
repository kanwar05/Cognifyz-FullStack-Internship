const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
const taskErrors = document.querySelector('#taskErrors');
const refreshTasks = document.querySelector('#refreshTasks');
const resetTaskBtn = document.querySelector('#resetTaskBtn');
const saveTaskBtn = document.querySelector('#saveTaskBtn');
const quoteBox = document.querySelector('#quoteBox');
let tasks = [];

const showErrors = (errors) => {
  taskErrors.classList.toggle('d-none', !errors.length);
  taskErrors.innerHTML = errors.map((error) => `<div>${error}</div>`).join('');
};

const switchTab = (tabName) => {
  document.querySelectorAll('.tab-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });

  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `${tabName}Panel`);
  });
};

document.querySelectorAll('.tab-button').forEach((button) => {
  button.addEventListener('click', () => switchTab(button.dataset.tab));
});

const taskBadge = (priority) => {
  const styles = {
    Low: 'success',
    Medium: 'info',
    High: 'warning'
  };
  return `<span class="badge text-bg-${styles[priority] || 'secondary'}">${priority}</span>`;
};

const updateSummary = () => {
  document.querySelector('#totalCount').textContent = tasks.length;
  document.querySelector('#pendingCount').textContent = tasks.filter((task) => task.status === 'Pending').length;
  document.querySelector('#completedCount').textContent = tasks.filter((task) => task.status === 'Completed').length;
};

const renderTasks = () => {
  if (!tasks.length) {
    taskList.innerHTML = '<div class="alert alert-info">No tasks yet. Create your first study task.</div>';
    updateSummary();
    return;
  }

  taskList.innerHTML = tasks
    .map((task) => {
      const dueDate = new Date(task.dueDate).toLocaleDateString();
      return `
        <article class="task-card">
          <div>
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
              <h3 class="h5 mb-0">${task.title}</h3>
              ${taskBadge(task.priority)}
            </div>
            <p class="task-meta mb-2">${task.status} | Due ${dueDate}</p>
            <p>${task.description || 'No description added.'}</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm" data-action="edit" data-id="${task._id}">Edit</button>
            <button class="btn btn-outline-danger btn-sm" data-action="delete" data-id="${task._id}">Delete</button>
          </div>
        </article>
      `;
    })
    .join('');
  updateSummary();
};

const loadTasks = async () => {
  const response = await fetch('/api/tasks');
  if (!response.ok) throw new Error('Could not load tasks');
  tasks = await response.json();
  renderTasks();
};

const loadQuote = async () => {
  try {
    const response = await fetch('/api/external/quote');
    const data = await response.json();
    quoteBox.textContent = `"${data.quote}" - ${data.author}${data.cached ? ' (cached)' : ''}`;
  } catch (error) {
    quoteBox.textContent = 'Keep going. Small progress still counts.';
  }
};

const getTaskPayload = () => ({
  title: document.querySelector('#title').value.trim(),
  description: document.querySelector('#description').value.trim(),
  priority: document.querySelector('#priority').value,
  status: document.querySelector('#status').value,
  dueDate: document.querySelector('#dueDate').value
});

const resetForm = () => {
  taskForm.reset();
  document.querySelector('#taskId').value = '';
  saveTaskBtn.textContent = 'Save Task';
  taskForm.querySelectorAll('.is-invalid, .is-valid').forEach((input) => {
    input.classList.remove('is-invalid', 'is-valid');
  });
  showErrors([]);
};

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showErrors([]);

  const title = document.querySelector('#title');
  const dueDate = document.querySelector('#dueDate');
  const invalid = [title, dueDate].filter((input) => !input.checkValidity());

  taskForm.querySelectorAll('input[required]').forEach((input) => {
    input.classList.toggle('is-invalid', !input.checkValidity());
    input.classList.toggle('is-valid', input.checkValidity());
  });

  if (invalid.length) return;

  const taskId = document.querySelector('#taskId').value;
  const response = await fetch(taskId ? `/api/tasks/${taskId}` : '/api/tasks', {
    method: taskId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(getTaskPayload())
  });

  const data = await response.json();
  if (!response.ok) {
    showErrors(data.errors || [data.error || 'Unable to save task.']);
    return;
  }

  resetForm();
  await loadTasks();
  switchTab('tasks');
});

taskList.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const task = tasks.find((item) => item._id === button.dataset.id);
  if (!task) return;

  if (button.dataset.action === 'edit') {
    document.querySelector('#taskId').value = task._id;
    document.querySelector('#title').value = task.title;
    document.querySelector('#description').value = task.description || '';
    document.querySelector('#priority').value = task.priority;
    document.querySelector('#status').value = task.status;
    document.querySelector('#dueDate').value = new Date(task.dueDate).toISOString().slice(0, 10);
    saveTaskBtn.textContent = 'Update Task';
    switchTab('create');
    return;
  }

  await fetch(`/api/tasks/${task._id}`, { method: 'DELETE' });
  await loadTasks();
});

refreshTasks.addEventListener('click', loadTasks);
resetTaskBtn.addEventListener('click', resetForm);

loadTasks().catch((error) => showErrors([error.message]));
loadQuote();
