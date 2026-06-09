const bcrypt = require('bcryptjs');

const users = [];
const tasks = [];

const createUser = async ({ name, email, password }) => {
  const exists = users.find((user) => user.email === email.toLowerCase());
  if (exists) throw new Error('Email is already registered');

  const user = {
    _id: `temp-user-${Date.now()}`,
    name,
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10)
  };
  users.push(user);
  return user;
};

const findUserByEmail = (email) => users.find((user) => user.email === email.toLowerCase());
const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);

const createTask = (task) => {
  const newTask = {
    _id: `temp-task-${Date.now()}`,
    ...task,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  tasks.push(newTask);
  return newTask;
};

const getTasksByUser = (userId) => tasks.filter((task) => String(task.user) === String(userId));

const updateTask = (taskId, userId, updates) => {
  const task = tasks.find((item) => item._id === taskId && String(item.user) === String(userId));
  if (!task) return null;
  Object.assign(task, updates, { updatedAt: new Date() });
  return task;
};

const deleteTask = (taskId, userId) => {
  const index = tasks.findIndex((item) => item._id === taskId && String(item.user) === String(userId));
  if (index === -1) return null;
  const [deleted] = tasks.splice(index, 1);
  return deleted;
};

module.exports = {
  createUser,
  findUserByEmail,
  comparePassword,
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask
};
