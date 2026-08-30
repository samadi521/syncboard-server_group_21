const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SyncBoard REST API is running"
    });
});


// API routes
app.use("/api/tasks", taskRoutes);


// 404 handler
app.use(notFound);


// Error handler
app.use(errorHandler);


module.exports = app;