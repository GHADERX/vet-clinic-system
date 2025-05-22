const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointment');
const doctorRoutes = require("./routes/doctorRoutes");
const verifyToken = require('./middleware/authMiddleware');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/appointments", verifyToken, appointmentRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
