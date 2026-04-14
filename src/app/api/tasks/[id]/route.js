import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// PUT — Update a task
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing task ID" }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, status, priority } = body;

    await query(
      "UPDATE tasks SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?",
      [title, description || "", status || "Pending", priority || "Medium", id]
    );

    const rows = await query("SELECT * FROM tasks WHERE id = ?", [id]);

    return NextResponse.json({ task: rows[0] });
  } catch (err) {
    console.error("PUT error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE — Remove a task
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing task ID" }, { status: 400 });
    }

    const result = await query("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}