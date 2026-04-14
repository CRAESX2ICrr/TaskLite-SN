"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title required");
      return;
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      // reset form
      setTitle("");
      setDescription("");
      setPriority("Medium");

      // 🔥 tell parent to reload tasks
      onAdd && onAdd();

    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding the task!");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto p-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl flex flex-col md:flex-row md:items-center gap-4"
    >
      <input
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-transparent border border-white/30 text-white px-4 py-3 rounded-lg"
        required
      />

      <input
        type="text"
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 bg-transparent border border-white/30 text-white px-4 py-3 rounded-lg"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="bg-transparent border border-white/30 text-white px-4 py-3 rounded-lg"
      >
        <option value="Low" className="text-black">Low</option>
        <option value="Medium" className="text-black">Medium</option>
        <option value="High" className="text-black">High</option>
      </select>

      <button
        type="submit"
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Add Task
      </button>
    </form>
  );
}