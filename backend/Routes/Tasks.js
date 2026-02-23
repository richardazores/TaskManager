const express = require("express");
const router = express.Router();

const CreateTask = require("../services/CreateTask");
const UpdateTask = require("../services/UpdateTask");
const DeleteTask = require("../services/DeleteTask");
const RetrieveTask = require("../services/RetrieveTask");

// Create a new task
router.post("/create", async (req, res) => {
  const { title, description, status, dueDate, assignedTo } = req.body;
  const createdAt = new Date();
  const result = await CreateTask(
    title,
    description,
    status,
    dueDate,
    assignedTo,
    createdAt,
  );
  if (result) {
    res.status(200).json({ message: "Task created successfully" });
  } else {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Retrieve all tasks
router.get("/all", async (req, res) => {
  const result = await RetrieveTask();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
});

// Update a task
router.post("/update", async (req, res) => {
  const { _id, set } = req.body;

  const result = await UpdateTask(_id, set);
  if (result) {
    res.status(200).json({ message: "Task updated successfully" });
  } else {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task

router.post("/delete", async (req, res) => {
  const { _id } = req.body;
  const result = await DeleteTask(_id);
  if (result) {
    res.status(200).json({ message: "Task deleted successfully" });
  } else {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
