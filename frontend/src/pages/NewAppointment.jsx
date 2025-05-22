import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function NewAppointment() {
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
    if (file) data.append("report", file);

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
    <div className="form-container">
      <h2>Add New Appointment</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="pet_name" placeholder="Pet Name" value={formData.pet_name} onChange={handleChange} required />
        <input type="text" name="pet_type" placeholder="Pet Type" value={formData.pet_type} onChange={handleChange} required />
        <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />
        <input type="text" name="doctor_name" placeholder="Doctor Name" value={formData.doctor_name} onChange={handleChange} required />
        <input type="number" name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} required />
        <input type="file" name="report" onChange={handleFileChange} />
        <button type="submit">Add Appointment</button>
      </form>

      <style>{`
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form input {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .form button {
          padding: 12px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .form button:hover {
          background-color: #0056b3;
        }

        .message {
          margin-bottom: 10px;
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .form-container {
            padding: 10px;
          }

          .form input,
          .form button {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
