const db = require("../db");
const path = require("path");

// ✅ إضافة موعد جديد (يدعم رفع ملف)
exports.createAppointment = async (req, res) => {
  const { pet_name, pet_type, appointment_date, doctor_name, user_id } = req.body;
  const file = req.file ? req.file.filename : null;

  if (!pet_name || !pet_type || !appointment_date || !doctor_name || !user_id) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [existing] = await db.execute(
      `SELECT * FROM appointments WHERE pet_name = ? AND pet_type = ? AND appointment_date = ? AND doctor_name = ? AND user_id = ?`,
      [pet_name, pet_type, appointment_date, doctor_name, user_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Appointment already exists ❌" });
    }

    // ✅ إدخال الموعد الجديد مع الملف
    await db.execute(
      `INSERT INTO appointments (pet_name, pet_type, appointment_date, doctor_name, user_id, file)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [pet_name, pet_type, appointment_date, doctor_name, user_id, file]
    );

    res.status(201).json({ message: "Appointment created successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};


// ✅ جلب كل المواعيد
exports.getAppointments = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM appointments");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ تعديل موعد
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { pet_name, pet_type, appointment_date, doctor_name } = req.body;

  try {
    await db.execute(
      `UPDATE appointments
       SET pet_name = ?, pet_type = ?, appointment_date = ?, doctor_name = ?
       WHERE id = ?`,
      [pet_name, pet_type, appointment_date, doctor_name, id]
    );
    res.status(200).json({ message: "Appointment updated successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ حذف موعد
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM appointments WHERE id = ?", [id]);
    res.status(200).json({ message: "Appointment deleted successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};
