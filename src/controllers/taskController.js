const TaskModel = require("../models/taskModel");

exports.getAllTasks = (req, res) => {
  try {
    const { status, priority, sort, order, page, limit } = req.query;
    const result = TaskModel.getAll({
      status, priority, sort, order,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.getTask = (req, res) => {
  try {
    const task = TaskModel.getById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

exports.createTask = (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = TaskModel.create({ title: title.trim(), description, status, priority });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.updateTask = (req, res) => {
  try {
    const task = TaskModel.update(req.params.id, req.body);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = (req, res) => {
  try {
    const deleted = TaskModel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
