import { createContext, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks from the backend
  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        setTasks(data);
      } catch (err) {
        setError(err.message || "Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  // Create a new task
  const addTask = async (taskData) => {
    try {
      setError("");

      const newTask = await createTask(taskData);

      setTasks((currentTasks) => [...currentTasks, newTask]);

      return newTask;
    } catch (err) {
      setError(err.message || "Failed to create task.");
      throw err;
    }
  };

  // Update an existing task
  const moveTask = async (taskId, newStatus) => {
    try {
      setError("");

      const updatedTask = await updateTask(taskId, {
        status: newStatus,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );

      return updatedTask;
    } catch (err) {
      setError(err.message || "Failed to update task.");
      throw err;
    }
  };

  // Delete a task
  const removeTask = async (taskId) => {
    try {
      setError("");

      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (err) {
      setError(err.message || "Failed to delete task.");
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        moveTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}