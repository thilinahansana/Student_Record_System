const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all students
router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get student by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM students WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Create a new student
router.post("/", (req, res) => {
  const { name, age, major } = req.body;
  db.query(
    "INSERT INTO students (name, age, major) VALUES (?, ?, ?)",
    [name, age, major],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Student added", id: result.insertId });
    }
  );
});

// Update student
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, major } = req.body;
  db.query(
    "UPDATE students SET name = ?, age = ?, major = ? WHERE id = ?",
    [name, age, major, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Student updated" });
    }
  );
});

// Delete student
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Student deleted" });
  });
});

module.exports = router;
