import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    api
      .get("/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch appointments:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Appointments List</h2>
      {appointments.length === 0 ? (
        <p style={styles.noData}>No appointments found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Pet Name</th>
                <th style={styles.th}>Pet Type</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Doctor</th>
                <th style={styles.th}>User ID</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td style={styles.td}>{appt.pet_name}</td>
                  <td style={styles.td}>{appt.pet_type}</td>
                  <td style={styles.td}>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                  <td style={styles.td}>{appt.doctor_name}</td>
                  <td style={styles.td}>{appt.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "100%",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },
  noData: {
    textAlign: "center",
    fontSize: "18px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
};
