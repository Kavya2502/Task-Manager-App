import { useState, useEffect } from "react";

function App() {
  const API = "http://localhost:5000/tasks";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(API);

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ run on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ add task
  const addTask = async () => {
    if (!title) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  };

  // ✅ toggle task
  const toggleTask = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
    });
    fetchTasks();
  };

  // ✅ delete task
  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  // ✅ ONLY ONE return
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📝 Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "5px", marginRight: "10px" }}
      />
      <button onClick={addTask}>Add</button>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "10px" }}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                cursor: "pointer",
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;