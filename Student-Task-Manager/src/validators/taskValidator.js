const validateTask = ({ title, description, priority, status, dueDate }) => {
  const errors = [];
  const allowedPriorities = ['Low', 'Medium', 'High'];
  const allowedStatuses = ['Pending', 'In Progress', 'Completed'];

  if (!title || title.trim().length < 3) errors.push('Title must be at least 3 characters.');
  if (description && description.length > 500) errors.push('Description cannot exceed 500 characters.');
  if (priority && !allowedPriorities.includes(priority)) errors.push('Priority is invalid.');
  if (status && !allowedStatuses.includes(status)) errors.push('Status is invalid.');
  if (!dueDate || Number.isNaN(Date.parse(dueDate))) errors.push('A valid due date is required.');

  return errors;
};

module.exports = validateTask;
