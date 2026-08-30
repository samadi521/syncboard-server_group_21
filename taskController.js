const tasks = require("../data/mockTasks");

// GET /api/tasks
const getTasks = (req, res) => {
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });
};


// GET /api/tasks/:id
const getTaskById = (req, res) => {
    const id = req.params.id;

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    res.status(200).json({
        success: true,
        data: task
    });
};


// POST /api/tasks
const createTask = (req, res) => {
    const {
        title,
        description,
        assignee,
        priority,
        status,
        dueDate
    } = req.body;

    if (
        !title ||
        !description ||
        !assignee ||
        !priority ||
        !status ||
        !dueDate
    ) {
        return res.status(400).json({
            success: false,
            message: "All task fields are required"
        });
    }

    const newId = `task-${String(tasks.length + 1).padStart(3, "0")}`;

    const newTask = {
        id: newId,
        title,
        description,
        assignee,
        priority,
        status,
        dueDate
    };

    tasks.push(newTask);

    res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: newTask
    });
};


// PUT /api/tasks/:id
const updateTask = (req, res) => {
    const id = req.params.id;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    const existingTask = tasks[taskIndex];

    const updatedTask = {
        ...existingTask,
        ...req.body,
        id: existingTask.id
    };

    tasks[taskIndex] = updatedTask;

    res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: updatedTask
    });
};


// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
    const id = req.params.id;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: deletedTask
    });
};


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};