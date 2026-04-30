const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.post("/test", (req, res) => {
  res.send("POST working");
});

const projectRoutes = require("./routes/project");
app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/task");
app.use("/api/tasks", taskRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);

console.log("Mongo URI:", process.env.MONGO_URI);

console.log("TEST ROUTE LOADED");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log("DB Error:", err));

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});