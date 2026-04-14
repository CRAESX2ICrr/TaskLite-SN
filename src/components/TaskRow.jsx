"use client";
import { useState } from "react";
import { Save, X, Pencil, Trash2 } from "lucide-react";

export default function TaskRow({ task, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  function startEdit() {
    setEditing(true);
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
  }

  function cancelEdit() {
    setEditing(false);
  }

  async function saveEdit() {
    if (!editTitle.trim()) {
      alert("Title required");
      return;
    }

    const ok = await updateTask(task.id, {
      title: editTitle,
      description: editDescription,
    });

    if (ok) setEditing(false);
  }

  function handleFieldChange(field, value) {
    updateTask(task.id, { [field]: value });
  }

  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">

      <td className="p-3 font-semibold">
        {editing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="bg-transparent border border-white/20 text-white px-2 py-1 rounded-md w-full"
          />
        ) : (
          task.title
        )}
      </td>

      <td className="p-3 text-gray-300">
        {editing ? (
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="bg-transparent border border-white/20 text-white px-2 py-1 rounded-md w-full"
          />
        ) : (
          task.description || "—"
        )}
      </td>

      <td className="p-3">
        <select
          value={task.priority}
          onChange={(e) => handleFieldChange("priority", e.target.value)}
          className="bg-black/50 border border-white/30 text-white px-2 py-1 rounded-md"
        >
          <option value="Low" className="text-black">Low</option>
          <option value="Medium" className="text-black">Medium</option>
          <option value="High" className="text-black">High</option>
        </select>
      </td>

      <td className="p-3">
        <select
          value={task.status}
          onChange={(e) => handleFieldChange("status", e.target.value)}
          className="bg-black/50 border border-white/30 text-white px-2 py-1 rounded-md"
        >
          <option value="Pending" className="text-black">Pending</option>
          <option value="In Progress" className="text-black">In Progress</option>
          <option value="Done" className="text-black">Done</option>
        </select>
      </td>

      <td className="p-3 text-gray-400">
        {task.created_at?.split("T")[0]}
      </td>

      <td className="p-3 text-center flex justify-center gap-3">
        {editing ? (
          <>
            <button onClick={saveEdit}>
              <Save size={16} />
            </button>
            <button onClick={cancelEdit}>
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button onClick={startEdit}>
              <Pencil size={16} />
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <Trash2 size={16} />
            </button>
          </>
        )}
      </td>

    </tr>
  );
}