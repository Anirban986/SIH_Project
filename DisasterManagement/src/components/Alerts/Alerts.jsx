import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Alerts.css";
import sos from '../../assets/sos.svg'
import alert from '../../assets/alert.svg'
const socket = io("http://localhost:5000");
import { motion } from "framer-motion"
export default function Alerts() {
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");
    if (token && userName && role) {
      setUser({ name: userName, role });
    } else {
      setUser(null);
    }
  }, []);

  // ✅ Fetch admin alerts if user is logged in
  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:5000/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.reverse());
        setNotificationCount(data.length);
      })
      .catch((err) => console.error("Failed to fetch alerts:", err));

    socket.on("newAlert", (alert) => {
      setAlerts((prev) => [alert, ...prev]);
      setNotificationCount((prev) => prev + 1);
    });

    socket.on("deleteAlert", (id) => {
      setAlerts((prev) => prev.filter((alert) => alert._id !== id));
      setNotificationCount((prev) => (prev > 0 ? prev - 1 : 0));
    });

    socket.on("initialAlerts", (data) => {
      setAlerts(data.reverse());
      setNotificationCount(data.length);
    });

    return () => {
      socket.off("newAlert");
      socket.off("deleteAlert");
      socket.off("initialAlerts");
    };
  }, [user]);

  // If user is not logged in, show a prompt
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='alerts'
      >
        <div className="alert-top">
          <h1>Alert Center</h1>
          <p>Real-time disaster alerts and warnings</p>
        </div>

        <div className="alert-bottom">
          <div className="alert-img">
            <img src={alert} alt="Alert Icon" /> {/* ✅ Now defined */}
          </div>
          <h1>Login for Real-time Alerts</h1>
          <p>Sign in to receive personalized disaster alerts and notifications.</p>
        </div>
      </motion.div>
    );
  }

  // Logged-in view
  return (
    <>
      <div className="alert-top-login">
        <div className="alert-top-login-seg1">
          <h1>Alert Center</h1>
          <p>Real-time disaster alerts and warnings </p>
        </div>
        <div className="alert-top-login-seg2">
         <img src={sos} alt="" />
          <p>SOS</p>
        </div>
      </div>
      <div
        className="user-alerts">
        <h1>
          Disaster Alerts <span className="notif-counter">({notificationCount})</span>
        </h1>

        {alerts.map((alert) => (
          <div key={alert._id} className={`alert-box ${alert.severity}`}>
            <span>
              [{new Date(alert.timestamp).toLocaleTimeString()}] {alert.message}
            </span>
            <button
              className="close-btn"
              onClick={() => {
                setAlerts((prev) => prev.filter((a) => a._id !== alert._id));
                setNotificationCount((prev) => (prev > 0 ? prev - 1 : 0));
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
