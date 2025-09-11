import React, { useState } from "react";
import { Link } from "react-router";
import "./Auth.css";

function RegisterTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    institutionName: "",
    institutionCode: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/register/teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSuccess(true);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register as Teacher</h2>
      <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="institutionName" placeholder="Institution Name" onChange={handleChange} required />
      <input type="text" name="institutionCode" placeholder="Institution Code" onChange={handleChange} required />
      <button type="submit">Register</button>
      <p className="message">{message}</p>
    </form>
  );
}

export default RegisterTeacher;
