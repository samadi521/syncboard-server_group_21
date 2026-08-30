import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById } from "../api/tasks";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

const statusLabels = {
  todo: "To Do",
  doing: "Doing",
  done: "Done",
  "To Do": "To Do",
  Doing: "Doing",
  Done: "Done",
};

const priorityLabels = {
  low: "Low",
  normal: "Normal",
  high: "High",
  Low: "Low",
  Normal: "Normal",
  High: "High",
};

export default function TaskDetailPage() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadTask() {
      setLoading(true);
      setError("");

      try {
        const data = await getTaskById(id);

        if (!cancelled) {
          setTask(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load task.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTask();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="page-container">
        <LoadingState />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <ErrorState message={error} />
      </main>
    );
  }

  if (!task) {
    return (
      <main className="page-container">
        <ErrorState message="Task could not be found." />
      </main>
    );
  }

  const displayStatus = statusLabels[task.status] || task.status;
  const displayPriority = priorityLabels[task.priority] || task.priority;

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "No due date";

  return (
    <main className="page-container narrow-page">
      <div className="back-link-container">
        <Link to="/" className="back-link">
          ← Back to Board
        </Link>
      </div>

      <section className="detail-card">
        <div className="detail-header">
          <div>
            <span
              className={`priority-badge ${String(
                task.priority
              ).toLowerCase()}`}
            >
              {displayPriority}
            </span>

            <h2>{task.title}</h2>
          </div>

          <span
            className={`detail-status ${String(
              task.status
            ).toLowerCase().replace(/\s+/g, "-")}`}
          >
            {displayStatus}
          </span>
        </div>

        <div className="detail-section">
          <h3>Description</h3>

          <p>{task.description}</p>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <span>Assignee</span>
            <strong>{task.assignee}</strong>
          </div>

          <div className="detail-item">
            <span>Priority</span>
            <strong>{displayPriority}</strong>
          </div>

          <div className="detail-item">
            <span>Status</span>
            <strong>{displayStatus}</strong>
          </div>

          <div className="detail-item">
            <span>Due Date</span>
            <strong>{formattedDate}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}