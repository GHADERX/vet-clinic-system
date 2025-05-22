import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddAppointment() {
  const [formData, setFormData] = useState({
    pet_name: "",
    pet_type: "",
    appointment_date: "",
    doctor_name: "",
    user_id: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (file) {
      data.append("file", file);
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await api.post("/appointments", data, config);
      setMessage(res.data.message);
      setFormData({
        pet_name: "",
        pet_type: "",
        appointment_date: "",
        doctor_name: "",
        user_id: "",
      });
      setFile(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Appointment</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <input
          type="text"
          name="pet_name"
          placeholder="Pet Name"
          value={formData.pet_name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="pet_type"
          placeholder="Pet Type"
          value={formData.pet_type}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="doctor_name"
          placeholder="Doctor Name"
          value={formData.doctor_name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Appointment</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
};
    