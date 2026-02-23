import { useState, useEffect } from "react";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
    assignedTo: "",
  });

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks/all");
      const data = await res.json();
      setTaskList(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit create or update
  const handleSubmit = async () => {
    try {
      let url = "http://localhost:5000/tasks/create";
      let body = {
        ...taskForm,
      };
      if (editingTask) {
        url = "http://localhost:5000/tasks/update";
        body = { _id: editingTask._id, set: taskForm };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setShowModal(false);
        setEditingTask(null);
        setTaskForm({
          title: "",
          description: "",
          status: "pending",
          dueDate: "",
          assignedTo: "",
        });
        fetchTasks(); // refresh
      }
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  // Edit a task
  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate.split("T")[0],
      assignedTo: task.assignedTo,
    });
    setShowModal(true);
  };

  // Delete a task
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch("http://localhost:5000/tasks/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        fetchTasks();
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Task Manager</h3>
      <button
        className="btn btn-success mb-3"
        onClick={() => setShowModal(true)}
      >
        {editingTask ? "Edit Task" : "Add Task"}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingTask ? "Edit Task" : "Add Task"}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label>Title</label>
                    <input
                      name="title"
                      value={taskForm.title}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={taskForm.description}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Assigned To</label>
                    <input
                      name="assignedTo"
                      value={taskForm.assignedTo}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Status</label>
                    <select
                      name="status"
                      value={taskForm.status}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="pending">pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={taskForm.dueDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {editingTask ? "Update Task" : "Add Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskList.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No tasks found
                </td>
              </tr>
            ) : (
              taskList.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.status}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
