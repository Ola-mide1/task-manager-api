const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const taskRoutes = require("./routes/taskRoutes");
const { initDB } = require("./models/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Initialize database
initDB();

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API",
    version: "1.0.0",
    endpoints: {
      tasks: "/api/tasks",
    },
  });
});

app.use("/api/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
