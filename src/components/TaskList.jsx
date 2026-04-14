"use client";

import TaskRow from "./TaskRow";

export default function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full text-sm md:text-base text-white">
        <thead className="bg-white/5 border-b border-white/10">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}