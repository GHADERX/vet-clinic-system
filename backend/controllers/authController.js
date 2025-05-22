const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');

// مفتاح JWT السري (غيّره في الإنتاج)
const secretKey = 'your_secret_key';

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // التحقق من وجود المستخدم مسبقًا
    const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إدخال المستخدم
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
};

// ✅ تسجيل الدخول
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userRows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (userRows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userRows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
