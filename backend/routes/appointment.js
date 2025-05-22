const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const verifyToken = require('../middleware/authMiddleware');

// ✅ إعداد multer
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // أنشئ مجلد "uploads" إن لم يكن موجوداً
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post(
  '/',
  verifyToken,
  upload.single('file'), // اسم الحقل في Postman
  appointmentController.createAppointment
);


router.get("/", upload.single("file"), verifyToken, appointmentController.getAppointments);
router.post("/", verifyToken, appointmentController.createAppointment);
router.put("/:id", verifyToken, appointmentController.updateAppointment);
router.delete("/:id", verifyToken, appointmentController.deleteAppointment);

module.exports = router;