"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskFilter from "@/components/TaskFilter";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const {
    tasks,
    loadTasks,
    updateTask,
    deleteTask,
  } = useTasks();

  return (
    <main className="flex flex-col items-center px-6 py-10 space-y-8">
      <h1 className="text-2xl font-semibold">TaskLite</h1>

      <TaskForm onAdd={loadTasks} />
      <TaskFilter onFilter={loadTasks} />

      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </main>
  );
}