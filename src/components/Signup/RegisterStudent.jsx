import React, { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };


  return (
    <div>
      
      <form  className="auth-form" onSubmit={handleSubmit}>
        <h2>Register as Student</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="institutionName" placeholder="Institution" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default RegisterStudent;
