import React, { useState } from "react";
import "./login.css";

function LoginTeacher() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("http://localhost:5000/login/teacher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.name); // save user name
                localStorage.setItem("role", "teacher");
                // Dispatch login event
                window.dispatchEvent(new Event("login"));

                setMessage("Login successful!");
                // Optional: redirect
                window.location.href = "/";
            } else {
                setMessage(data.error || "Login failed");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred. Try again.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Teacher Login</h2>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
}

export default LoginTeacher;
