import React, { useState } from "react";
import { Link } from "react-router";
import "./Auth.css";

function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    institutionName: "",
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
      const response = await fetch("http://localhost:5000/register/student", {
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
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register as Student</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="institutionName" placeholder="Institution Name" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default RegisterStudent;
