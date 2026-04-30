const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");


// ✅ CREATE TASK (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create tasks" });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      assignedTo: req.body.assignedTo,
      projectId: req.body.projectId,
      dueDate: req.body.dueDate,
      status: "To Do"
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET TASKS
// Admin → all tasks
// Member → only assigned tasks
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({
        assignedTo: req.user.id
      });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE STATUS
// Admin → any task
// Member → only own task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;