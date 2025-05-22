import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./pages/Signup";
import AppointmentsList from "./components/AppointmentsList";
import AddAppointment from './components/AddAppointment';
import Doctors from "./pages/Doctors";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/appointments" element={<AppointmentsList />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </Router>
  );
}

export default App;

