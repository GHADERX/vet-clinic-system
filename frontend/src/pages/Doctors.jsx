import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // جلب قائمة الأطباء عند تحميل الصفحة
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/doctors", { name });
      setMessage(response.data.message);
      setName("");
      fetchDoctors();
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/doctors/${id}`);
      setMessage(response.data.message);
      fetchDoctors();
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Doctors Management</h2>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleAdd} style={styles.form}>
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Add Doctor
        </button>
      </form>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td style={styles.td}>{doctor.id}</td>
                <td style={styles.td}>{doctor.name}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  message: {
    color: "green",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f5f5f5",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
