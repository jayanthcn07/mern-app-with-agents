import { useState, useEffect } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [file, setFile] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/all");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    try {
      await API.post("/agents/add", form);
      alert("Agent added successfully");
      setForm({ name: "", email: "", mobile: "", password: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Error adding agent");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/upload/upload", formData);
      alert("File uploaded successfully");
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  // Group tasks by agent
  const groupedTasks = tasks.reduce((acc, task) => {
    const agentName = task.assignedTo?.name || "Unknown";

    if (!acc[agentName]) {
      acc[agentName] = [];
    }

    acc[agentName].push(task);
    return acc;
  }, {});

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <div className="card">
        <h3>Add Agent</h3>
        <form onSubmit={handleAddAgent}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Add Agent</button>
        </form>
      </div>

      <div className="card">
        <h3>Upload CSV</h3>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>

      <div className="card">
        <h3>Distributed Tasks</h3>
        {Object.keys(groupedTasks).map((agentName) => (
          <div key={agentName}>
            <h4>Agent: {agentName}</h4>
            {groupedTasks[agentName].map((task) => (
              <p key={task._id}>
                {task.firstName} — {task.phone}
              </p>
            ))}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
