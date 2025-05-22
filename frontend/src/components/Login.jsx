import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      console.log(response.data); // اختبار: طباعة البيانات في الكونسول
      localStorage.setItem("token", response.data.token);

      alert('✅ Login successful!');
      localStorage.setItem('token', response.data.token); // تخزين التوكن إذا احتجناه لاحقاً
    } catch (error) {
      console.error(error);
      alert('❌ Login failed. Please check your credentials.');
    }
  };

return (
  <div className="login-container">
    <form onSubmit={handleLogin} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p style={{ marginTop: '10px' }}>
    Don't have an account? <a href="/register" style={{ color: '#007bff' }}>Register</a>
  </p>
    </form>
  </div>
);

}

export default Login;
