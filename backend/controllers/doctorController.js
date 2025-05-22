const db = require("../db");

// ✅ جلب كل الأطباء
exports.getAllDoctors = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM doctors ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ إضافة طبيب جديد
exports.addDoctor = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Doctor name is required" });
  }

  try {
    await db.execute("INSERT INTO doctors (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Doctor added successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ حذف طبيب
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM doctors WHERE id = ?", [id]);
    res.status(200).json({ message: "Doctor deleted successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};
