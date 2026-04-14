"use client";
import { useEffect, useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks (with simple filters)
  async function loadTasks(filters = {}) {
    setLoading(true);
    setError(null);

    try {
      let query = [];

      if (filters.status) query.push(`status=${filters.status}`);
      if (filters.priority) query.push(`priority=${filters.priority}`);

      const url = "/api/tasks" + (query.length ? `?${query.join("&")}` : "");

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Update task
  async function updateTask(id, updates) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Update failed");

      // update locally instead of refetch
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );

      return true;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return false;
    }
  }

  // Delete task
  async function deleteTask(id) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setTasks((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return false;
    }
  }

  // Load on mount
  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    updateTask,
    deleteTask,
  };
}