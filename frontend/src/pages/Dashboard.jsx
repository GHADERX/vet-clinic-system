import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  // منع الوصول بدون توكن
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p>Welcome to the veterinary clinic management system.</p>

      <div style={styles.buttonsContainer}>
        <button onClick={() => navigate("/appointments")} style={{ ...styles.button, backgroundColor: "#28a745" }}>
          View Appointments
        </button>
        <button onClick={() => navigate("/appointments/new")} style={{ ...styles.button, backgroundColor: "#007bff" }}>
          Add New Appointment
        </button>
        <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: "#dc3545" }}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

// ملاحظة: flexDirection: "column" يجعل الأزرار تظهر بشكل رأسي في الشاشات الصغيرة.
// يمكنك لاحقًا استخدام media queries أو @media CSS إذا أردت جعلها أفقيًا في الشاشات الكبيرة.
