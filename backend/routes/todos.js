const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM todos ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a todo
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  try {
    const [result] = await db.query("INSERT INTO todos (title) VALUES (?)", [title]);
    res.status(201).json({ id: result.insertId, title, completed: false });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a todo
router.put("/:id", async (req, res) => {
  const { title, completed } = req.body;
  try {
    await db.query("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [
      title, completed, req.params.id,
    ]);
    res.json({ message: "Todo updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;