# 🐾 Vet Clinic Appointment Management System

نظام متكامل لإدارة مواعيد عيادة بيطرية يسمح للمستخدمين بتسجيل الدخول، حجز مواعيد مع الأطباء، رفع ملفات تقارير طبية، وإدارة الأطباء.

---

## 📁 هيكل المشروع

```
vet-clinic-system/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/         ← ملفات المرفقات المرفوعة
│   └── index.js         ← نقطة بدء الخادم
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── main.jsx
```

---

## ✅ المتطلبات

### 📦 التثبيت

* Node.js (الإصدار 18 أو أعلى)
* MySQL

---

## 🧩 خطوات التشغيل

### 1. إعداد قاعدة البيانات

قم بإنشاء قاعدة بيانات باسم `vet_clinic` (أو أي اسم مفضل) وأدخل الجداول التالية:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_name VARCHAR(100),
    pet_type VARCHAR(100),
    appointment_date DATE,
    doctor_name VARCHAR(100),
    user_id INT,
    file VARCHAR(255),
    file_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 2. إعداد الخادم (Backend)

```bash
cd backend
npm install
node index.js
```

* الخادم يعمل على: `http://localhost:5000`

---

### 3. تشغيل الواجهة (Frontend)

```bash
cd frontend
npm install
npm run dev
```

* الواجهة تعمل على: `http://localhost:5173`

---

## 🔐 معلومات التحقق (Authentication)

* تسجيل الدخول يعطي JWT token
* يجب تمرير التوكن في الهيدر عند الوصول إلى:

  * /appointments
  * /doctors

### مثال على الهيدر:

```http
Authorization: Bearer <your_token>
```

---

## 📌 الميزات المكتملة

* تسجيل مستخدم وتسجيل الدخول ✅
* لوحة تحكم ✅
* عرض المواعيد ✅
* إضافة موعد مع ملف مرفق ✅
* عرض، إضافة، حذف الأطباء ✅
* حماية المسارات بـ JWT ✅
* تصميم متجاوب ✅
* توثيق كامل على Postman ✅

---

## 🧪 اختبار API عبر Postman

1. استيراد ملف Collection في Postman
2. جرب المسارات التالية:

   * POST /api/auth/register
   * POST /api/auth/login
   * GET /api/appointments
   * POST /api/appointments ← مع ملف
   * GET /api/doctors
   * POST /api/doctors
   * DELETE /api/doctors/\:id

---

## 🧑‍💻 من تنفيذ:

Ghadeer

> لأي استفسار يمكنك الرجوع إلى الكود أو التواصل مع المطور.

0502693843
