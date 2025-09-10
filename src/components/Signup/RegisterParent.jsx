import React, { useState } from "react";

import "./Auth.css";

function RegisterParent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    studentEmail: "",
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
        <h2>Register as Parent</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="email" name="studentEmail" placeholder="Student's Email" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default RegisterParent;
