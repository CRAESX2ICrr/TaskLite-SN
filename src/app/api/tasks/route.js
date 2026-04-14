import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const url = new URL(request.url);

    const q = url.searchParams.get("q");
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const sort = url.searchParams.get("sort") || "newest";

    let sql = "SELECT * FROM tasks WHERE 1=1";
    let params = [];

    // search
    if (q) {
      sql += " AND (title LIKE ? OR description LIKE ?)";
      params.push(`%${q}%`, `%${q}%`);
    }

    // status filter
    if (status && status !== "All") {
      sql += " AND status = ?";
      params.push(status);
    }

    // priority filter
    if (priority && priority !== "All") {
      sql += " AND priority = ?";
      params.push(priority);
    }

    // sorting
    if (sort === "oldest") {
      sql += " ORDER BY id ASC";
    } else {
      sql += " ORDER BY id DESC";
    }

    const rows = await query(sql, params);

    return NextResponse.json({ tasks: rows });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      description = "",
      status = "Pending",
      priority = "Medium",
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)",
      [title, description, status, priority]
    );

    const rows = await query(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId]
    );

    return NextResponse.json({ task: rows[0] }, { status: 201 });

  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}