const { getDB } = require("./database");

class TaskModel {
  static getAll({ status, priority, sort = "created_at", order = "DESC", page = 1, limit = 10 }) {
    const db = getDB();
    let query = "SELECT * FROM tasks WHERE 1=1";
    const params = [];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }
    if (priority) {
      query += " AND priority = ?";
      params.push(priority);
    }

    const allowedSort = ["created_at", "updated_at", "title", "priority", "status"];
    const sortCol = allowedSort.includes(sort) ? sort : "created_at";
    const sortOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
    query += ` ORDER BY ${sortCol} ${sortOrder}`;

    const offset = (page - 1) * limit;
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const tasks = db.prepare(query).all(...params);

    // Get total count for pagination
    let countQuery = "SELECT COUNT(*) as total FROM tasks WHERE 1=1";
    const countParams = [];
    if (status) { countQuery += " AND status = ?"; countParams.push(status); }
    if (priority) { countQuery += " AND priority = ?"; countParams.push(priority); }
    const { total } = db.prepare(countQuery).get(...countParams);

    return { tasks, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) };
  }

  static getById(id) {
    return getDB().prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  }

  static create({ title, description = "", status = "pending", priority = "medium" }) {
    const result = getDB().prepare(
      "INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)"
    ).run(title, description, status, priority);
    return this.getById(result.lastInsertRowid);
  }

  static update(id, fields) {
    const existing = this.getById(id);
    if (!existing) return null;

    const updated = { ...existing, ...fields, updated_at: new Date().toISOString() };
    getDB().prepare(
      "UPDATE tasks SET title=?, description=?, status=?, priority=?, updated_at=? WHERE id=?"
    ).run(updated.title, updated.description, updated.status, updated.priority, updated.updated_at, id);
    return this.getById(id);
  }

  static delete(id) {
    const existing = this.getById(id);
    if (!existing) return false;
    getDB().prepare("DELETE FROM tasks WHERE id = ?").run(id);
    return true;
  }
}

module.exports = TaskModel;
