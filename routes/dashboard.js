const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id
    });

    const total = tasks.length;

    const todo = tasks.filter(t => t.status === "To Do").length;
    const inProgress = tasks.filter(t => t.status === "In Progress").length;
    const done = tasks.filter(t => t.status === "Done").length;

    // ✅ Overdue logic
    const now = new Date();
    const overdue = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < now && t.status !== "Done"
    ).length;

    // ✅ Tasks per user (simple version)
    const tasksPerUser = {};
    tasks.forEach(t => {
      const user = t.assignedTo.toString();
      tasksPerUser[user] = (tasksPerUser[user] || 0) + 1;
    });

    res.json({
      total,
      todo,
      inProgress,
      done,
      overdue,
      tasksPerUser
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;