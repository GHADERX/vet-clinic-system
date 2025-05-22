const db = require("../db");
const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const verifyToken = require("../middleware/authMiddleware");

exports.getAllDoctors = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM doctors ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addDoctor = async (req, res) => {
  const { name, specialization } = req.body;
  if (!name || !specialization) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    await db.execute("INSERT INTO doctors (name, specialization) VALUES (?, ?)", [name, specialization]);
    res.status(201).json({ message: "Doctor added successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM doctors WHERE id = ?", [id]);
    res.status(200).json({ message: "Doctor deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

router.get("/", verifyToken, doctorController.getAllDoctors);
router.post("/", verifyToken, doctorController.addDoctor);
router.delete("/:id", verifyToken, doctorController.deleteDoctor);


module.exports = router;