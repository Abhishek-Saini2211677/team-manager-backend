const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");


// ✅ CREATE PROJECT (creator becomes admin)
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Project name required" });
    }

    const project = await Project.create({
      name: req.body.name,
      createdBy: req.user.id,
      members: [req.user.id]
    });

    res.json(project);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET PROJECTS (only user's projects)
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id
    });

    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ ADD MEMBER (only creator/admin)
router.put("/add-member", auth, async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only admin can add members" });
    }

    // fix ObjectId comparison
    if (!project.members.some(m => m.toString() === userId)) {
      project.members.push(userId);
    }

    await project.save();

    res.json(project);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ REMOVE MEMBER (only creator/admin)
router.put("/remove-member", auth, async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only admin can remove members" });
    }

    project.members = project.members.filter(
      m => m.toString() !== userId
    );

    await project.save();

    res.json(project);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;