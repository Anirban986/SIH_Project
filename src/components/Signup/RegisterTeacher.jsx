import React, { useState } from "react";
import "./Auth.css";
function RegisterTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register as Teacher</h2>

      <label>Full Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Subject</label>
      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterTeacher;
