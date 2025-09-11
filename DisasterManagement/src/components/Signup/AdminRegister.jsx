import React, { useState } from "react";
import "./Auth.css"; // optional, style as you like

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const response = await fetch("http://localhost:5000/register/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.text(); // backend sends plain text

    if (response.ok) {
      setMessage(result); // e.g. "Admin registered successfully"
    } else {
      setMessage(result || "Registration failed");
    }
  } catch (err) {
    console.error(err);
    setMessage("Something went wrong. Try again.");
  }
};


  return (
    <div className="auth-form">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Admin Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="secret"
          placeholder="Secret Key"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default AdminRegister;
