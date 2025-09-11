import React, { useState } from "react";
import "./login.css"; // optional

function AdminLogin() {
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
            const response = await fetch("http://localhost:5000/login/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include", // important for cookies
            });
              const data = await response.json(); // <-- make sure to parse JSON
            if (response.ok) {

                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.name); // save user name
                localStorage.setItem("role", "admin");
                // Dispatch login event
                window.dispatchEvent(new Event("login"));

                setMessage("Login successful!");
                // Optional: redirect
               // window.location.href = "/";
            } else {
                setMessage(data.error || "Login failed");
            }

        } catch (err) {
            console.error(err);
            setMessage("Something went wrong. Try again.");
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
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
                <button type="submit">Login</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
}

export default AdminLogin;
