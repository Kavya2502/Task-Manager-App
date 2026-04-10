const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// storage
let tasks = [];

// ✅ GET - get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ POST - add new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // validation
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask); // 👉 IMPORTANT
  res.status(201).json(newTask); // 👉 send response
});

// ✅ PATCH - mark complete
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;

  res.json(task);
});

// ✅ DELETE - remove task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  tasks = tasks.filter(t => t.id !== id);

  res.json({ message: "Task deleted" });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});