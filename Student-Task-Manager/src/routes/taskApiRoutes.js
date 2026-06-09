const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { requireAuth } = require('../middleware/auth');
const validateTask = require('../validators/taskValidator');
const tempStore = require('../utils/tempStore');

const router = express.Router();

router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const tasks =
      mongoose.connection.readyState === 1
        ? await Task.find({ user: userId }).sort({ createdAt: -1 })
        : tempStore.getTasksByUser(userId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const errors = validateTask(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const payload = {
      title: req.body.title.trim(),
      description: req.body.description || '',
      priority: req.body.priority || 'Medium',
      status: req.body.status || 'Pending',
      dueDate: req.body.dueDate,
      user: req.session.user.id
    };

    const task =
      mongoose.connection.readyState === 1 ? await Task.create(payload) : tempStore.createTask(payload);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const errors = validateTask(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const updates = {
      title: req.body.title.trim(),
      description: req.body.description || '',
      priority: req.body.priority || 'Medium',
      status: req.body.status || 'Pending',
      dueDate: req.body.dueDate
    };

    const task =
      mongoose.connection.readyState === 1
        ? await Task.findOneAndUpdate({ _id: req.params.id, user: req.session.user.id }, updates, {
            new: true,
            runValidators: true
          })
        : tempStore.updateTask(req.params.id, req.session.user.id, updates);

    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const task =
      mongoose.connection.readyState === 1
        ? await Task.findOneAndDelete({ _id: req.params.id, user: req.session.user.id })
        : tempStore.deleteTask(req.params.id, req.session.user.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
